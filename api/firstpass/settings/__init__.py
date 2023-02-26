import socket

if(socket == 'first-pass-sfs-0'):
    from production import *
else:
    from dev import *