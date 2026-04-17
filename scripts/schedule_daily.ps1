# schedule_daily.ps1 - Register daily.ps1 as a Windows scheduled task
# Runs every day at 06:00

$taskName = "Skriuwer Daily Update"
$scriptPath = "C:\Users\aukeh\skriuwer-site\scripts\daily.ps1"
$logPath = "C:\Users\aukeh\skriuwer-site\scripts\daily.log"
$pwshPath = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"

# Remove existing task if present
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction `
    -Execute $pwshPath `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -Daily -At "06:00"

$settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
    -RunOnlyIfNetworkAvailable `
    -StartWhenAvailable

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Force

Write-Host ""
Write-Host "=== Daily Task Scheduled ==="
Write-Host "Name  : $taskName"
Write-Host "Runs  : Every day at 06:00"
Write-Host "Script: $scriptPath"
Write-Host "Log   : $logPath"
Write-Host ""
Write-Host "To run now: Start-ScheduledTask -TaskName '$taskName'"
