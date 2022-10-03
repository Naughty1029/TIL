通常HttpClientでHTTPヘッダを指定する場合は以下のように書くことが出来ます。

```c#
var url = "https://www.aaaa.jp";

using (HttpClient client = new HttpClient())
{
    client.DefaultRequestHeaders.Add("Authorization", "_____");
    var response = await client.GetAsync(url);
    var json = await response.Content.ReadAsStringAsync();
}
```

参考リンク先
- [HttpClient で任意のHTTPヘッダを指定した時 FormatException が発生する](https://kagasu.hatenablog.com/entry/2017/08/10/050726)
- [C# 今更ですが、HttpClientを使う](https://qiita.com/rawr/items/f78a3830d894042f891b)

