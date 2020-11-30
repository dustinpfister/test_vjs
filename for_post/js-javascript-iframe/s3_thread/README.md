# threading and iframes

Conventional wisdom might lead one to believe that each iframe would also give another event loop. However it would appear that this is not the case. What an iframe will give is a separate iframe, however all javaScript code in the iframe as well as the parent page will run in a single event loop.

Here is a [link on the subject from 2009 on the subject](https://groups.google.com/g/google-web-toolkit/c/r0p-fZnmwlg/m/Vz4VTQTPAAAJ?pli=1).

The example in this section also seems to show that this is still the case today also as of chrome 87.x ( 2020 )