$env:PATH = 'C:\Users\aukeh\AppData\Roaming\npm;C:\Program Files\nodejs;' + $env:PATH
Set-Location 'C:\Users\aukeh\skriuwer-site'
vercel --prod --yes
