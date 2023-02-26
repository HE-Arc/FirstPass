import socket

if(socket.gethostname() == 'first-pass-sfs-0'):
    from production import *
else:
    from dev import *