import datetime
import email
import http.server
import os
import socketserver
import subprocess
import sys


class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith("/"):
            self.path = self.path[:-1]
        if "." not in self.path:
            self.path += ".html"

        f = self.send_head()
        if f:
            try:
                self.copyfile(f, self.wfile)
            finally:
                f.close()

    def send_head(self):
        path = self.translate_path(self.path)
        ctype = self.guess_type(path)
        print(path, self.path, ctype)

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(http.HTTPStatus.NOT_FOUND, "Page doesn't exist")
            return None

        try:
            fs = os.fstat(f.fileno())
            if ("If-Modified-Since" in self.headers
                    and "If-None-Match" not in self.headers):
                try:
                    ims = email.utils.parsedate_to_datetime(
                        self.headers["If-Modified-Since"])
                except (TypeError, IndexError, OverflowError, ValueError):
                    pass
                else:
                    if ims.tzinfo is None:
                        # obsolete format with no timezone, cf.
                        # https://tools.ietf.org/html/rfc7231#section-7.1.1.1
                        ims = ims.replace(tzinfo=datetime.timezone.utc)
                    if ims.tzinfo is datetime.timezone.utc:
                        # compare to UTC datetime of last modification
                        last_modif = datetime.datetime.fromtimestamp(
                            fs.st_mtime, datetime.timezone.utc)
                        # remove microseconds, like in If-Modified-Since
                        last_modif = last_modif.replace(microsecond=0)

                        if last_modif <= ims:
                            self.send_response(http.HTTPStatus.NOT_MODIFIED)
                            self.end_headers()
                            f.close()
                            return None

            self.send_response(http.HTTPStatus.OK)
            self.send_header("Content-type", ctype)
            self.send_header("Content-Length", str(fs[6]))
            self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
            self.end_headers()
            return f
        except:
            f.close()
            raise


PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

if PORT == 80:
    if os.geteuid() == 0:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    else:
        subprocess.run(['sudo', sys.executable] + sys.argv)
else:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Start serving at port", PORT)
        httpd.serve_forever()
