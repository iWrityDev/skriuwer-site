$result = python -c "import os; key = os.environ.get('ANTHROPIC_API_KEY', ''); print('Length:', len(key)); print('Starts with sk-ant:', key.startswith('sk-ant'))" 2>&1
Write-Host $result
