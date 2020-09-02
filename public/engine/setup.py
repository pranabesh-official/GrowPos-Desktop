
from cx_Freeze import setup, Executable

# Dependencies are automatically detected, but some modules need help.
buildOptions = dict(
    packages = [ 'jinja2', 'jinja2.ext', 'email' , 'sqlalchemy' ],
    excludes = [],
    # We can list binary includes here if our target environment is missing them.
    bin_includes = [
        'libcrypto.so.1.0.0',
        'libcrypto.so.10',
        'libgssapi_krb5.so.2',
        'libk5crypto.so.3',
        'libkeyutils.so.1',
        'libssl.so.1.0.1e',
        'libssl.so.10'
    ],
    icon = ["icon.ico"]
)

executables = [
    Executable(
        'run.py',
        base = None,
        targetName = 'DB',
       
    
    )
]

setup(
    name='DB',
    version = '0.1',
    description = 'CafeGrow Db',
    options = dict(build_exe = buildOptions),
    executables = executables
)