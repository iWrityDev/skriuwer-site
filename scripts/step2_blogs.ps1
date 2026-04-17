$env:PATH = 'C:\Program Files\nodejs;C:\Users\aukeh\AppData\Roaming\npm;' + $env:PATH
Set-Location 'C:\Users\aukeh\skriuwer-site'
$secretsFile = 'C:\Users\aukeh\skriuwer-site\scripts\secrets.env'
Get-Content $secretsFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#') -and $line.Contains('=')) {
        $parts = $line.Split('=', 2)
        $k = $parts[0].Trim(); $v = $parts[1].Trim()
        if ($v) { [System.Environment]::SetEnvironmentVariable($k, $v, 'Process') }
    }
}
python 'C:\Users\aukeh\skriuwer-site\scripts\generate_blog.py' --count 50 --cheap
