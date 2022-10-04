```c#
public class Program
{
	public static void Main()
	{
		Person p1 = new Person(); 
        Person p2 = new Person();
		p1.name = "山田太郎";   //  フィールドnameに値を代入
		p1.age = 19;            //  フィールドageに値を代入
		p2.SetAgeAndName("佐藤花子", 23);   //  setAgeAndName()メソッドで、nameとageを設定
		p1.ShowAgeAndName();
		p2.ShowAgeAndName();
	}
}

class Person
{
	public string name = "";
	public int age = 0;
	
	public void ShowAgeAndName()
	{
		Console.WriteLine("名前：{0} 年齢:{1}",name,age);
	}
	
	public void SetAgeAndName(string name , int age)
	{
		this.name = name;
		this.age = age;
	}
}
```


## オーバーロードについて
下記ではCalcクラスにAdd()メソッドが複数定義されている。これを、オーバーロードと言う。

呼び出されたときに、それぞれ引数の数によって使われるメソッドが決定する。

ただし、その時同じ名前のメソッドは、それぞれ引数および戻り値の型が異なっている必要があります。

```C#
public class Program
{
	public static void Main()
	{
		Calc calc = new Calc();
		int a = 1,b = 2,c = 3;
		int ans1 = calc.Add(a, b);
		int ans2 = calc.Add(a, b, c);
		Console.WriteLine("{0} + {1} = {2}", a, b, ans1);
		Console.WriteLine("{0} + {1} + {2} = {3}", a, b, c, ans2);
	}
}

class Calc
{
	public int Add( int a , int b)
	{
		return a + b;
	}
	
	public int Add( int a , int b, int c)
	{
		return a + b + c;
	}
}
```

**実行結果**
```
1 + 2 = 3
1 + 2 + 3 = 6
```