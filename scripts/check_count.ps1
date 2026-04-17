$data = Get-Content 'C:\Users\aukeh\skriuwer-site\data\books.json' -Raw | ConvertFrom-Json
Write-Host "Books in catalogue: $($data.books.Count)"
$data2 = Get-Content 'C:\Users\aukeh\skriuwer-site\data\blog-posts.json' -Raw | ConvertFrom-Json
Write-Host "Blog posts: $($data2.posts.Count)"
