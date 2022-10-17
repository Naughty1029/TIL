
```
vagrant up
```
```
vagrant ssh
```
```
mysql -u oruca -p
```

## USE
使用するデータベースを選択する
```sql
USE oruca;
```

## SELECT
SELECT は、登録されているデータを抽出する命令文です。

```sql
SELECT カラム名 FROM テーブル名;
```
社員テーブルのレコードを抽出してみる。
```sql
SELECT team_id, number, last_name, first_name, sort FROM m_member;
```
チームテーブルのレコードを抽出してみる。
```sql
SELECT team_id, team_name, sort FROM m_team;
```
社員テーブルのレコードを、カラムを指定せず全て表示してみる。
```sql
SELECT * FROM m_member;
```


### WHERE
WHERE は 絞り込み機能。
```sql
SELECT カラム名 FROM テーブル名 WHERE カラム名 比較演算子 値;
```
社員テーブルのチームIDが「3」（エンジニアチーム）のレコードだけ抽出してみる。
```sql
SELECT team_id, number, last_name, first_name, sort FROM m_member WHERE team_id = 3;
```
社員テーブルのチームIDが「2」以上のレコードだけ抽出してみる。
```sql
SELECT team_id, number, last_name, first_name, sort FROM m_member WHERE team_id >= 2;
```
社員テーブルのチームIDが「3」、且つ、姓が「竹内」または「野村」のレコードだけ抽出してみる。
```sql
SELECT team_id, number, last_name, first_name, sort FROM m_member WHERE team_id = 3 AND (last_name = '竹内' OR last_name = '野村');
```
改行やインデントで見やすくしてみる。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
WHERE
    team_id = 3 AND (last_name = '竹内' OR last_name = '野村');
```

### ORDER BY
ORDER BY は並び替え機能。
```sql
SELECT カラム名 FROM テーブル名 ORDER BY カラム名 ASC(昇順)|DESC(降順);
```
社員テーブルからレコードを抽出して、sort カラムの昇順で並び替えてみる。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
ORDER BY
    sort ASC;
```
社員テーブルからレコードを抽出して、sort カラムの降順で並び替えてみる。
```sql
SELECT
   team_id, number, last_name, first_name, sort
FROM
    m_member
ORDER BY
    sort DESC;
```
社員テーブルのレコードを抽出して、チームIDの昇順で並び変えつつ、sortカラムの降順で並び替えてみる。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
ORDER BY
    team_id ASC, sort DESC;
```
社員テーブルのチームIDが「3」（エンジニアチーム）のレコードのみ抽出し、sortカラムの昇順で並び替えてみる。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
WHERE
    team_id = 3
ORDER BY
    sort ASC;
```

### LIMIT / OFFSET
LIMIT は抽出件数の指定、OFFSET は抽出開始位置の指定

3件抽出。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
LIMIT 3;
```
４件目から３件抽出。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
LIMIT 3
OFFSET 3;
```
LIMIT で開始位置も指定できる模様（開始位置, 抽出件数）
４件目から５件抽出。
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
LIMIT 3, 5;
```
### JOIN
テーブルを結合する機能。
結合方法には、内部結合と外部結合がある。

#### INNER JOIN
内部結合のほう。
結合するテーブルに、結合条件に一致するものがなければ、そのレコードは除外される。

```sql
SELECT カラム名 FROM テーブル名 INNER JOIN テーブル名 ON 結合条件;
```
社員テーブルにチームテーブルを内部結合してみる。
```sql
SELECT
    *
FROM
    m_member
INNER JOIN
    m_team
ON
    m_member.team_id = m_team.team_id;
```
社員テーブルにチームテーブルを内部結合して、抽出するカラムをきちんと指定してみる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    m_team.team_name
FROM
    m_member
INNER JOIN
    m_team
ON
    m_member.team_id = m_team.team_id;
```
社員テーブルに、コンディションテーブルを内部結合してみる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    t_condition.*
FROM
    m_member
INNER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id;
```
社員テーブルに、チームテーブル・コンディションテーブルを内部結合してみる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    m_team.team_name,
    t_condition.*
FROM
    m_member
INNER JOIN
    m_team
ON
    m_member.team_id = m_team.team_id
INNER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id;
```
社員テーブルに、チームテーブル・コンディションテーブル・ステータステーブル・勤務時間テーブルを内部結合してみる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    m_team.team_name,
    m_status.status,
    m_worktime.worktime,
    t_condition.comment
FROM
    m_member
INNER JOIN
    m_team
ON
    m_member.team_id = m_team.team_id
INNER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id
INNER JOIN
    m_status
ON
    t_condition.status_id = m_status.status_id
INNER JOIN
    m_worktime
ON
    t_condition.worktime_id = m_worktime.worktime_id;
```
#### LEFT OUTER JOIN / RIGHT OUTER JOIN
外部結合のほう。
結合するテーブルに、結合条件に一致するものがなければ、該当カラムは NULL となる。

LEFT OUTER JOIN は、「テーブル名1」（左側のテーブル）が主になる。
「テーブル名2」に結合条件に一致するレコードがなければ「テーブル名2」のカラムのデータは NULL となる。
```sql
SELECT カラム名 FROM テーブル名1 LEFT OUTER JOIN テーブル名2 ON 結合条件;
```
RIGHT OUTER JOIN は、「テーブル名2」（右側のテーブル）が主になる。
「テーブル名1」に結合条件に一致するレコードがなければ「テーブル名1」のカラムのデータは NULL となる。
```sql
SELECT カラム名 FROM テーブル名1 RIGHT OUTER JOIN テーブル名2 ON 結合条件;
```

> 事前に t_condition テーブルの内容を確認しておきましょう。
> ```sql
> SELECT * FROM t_condition; 
> ```
> member_idが「0」（社員テーブルに存在しないID）のレコードがあります。
> member_idが「5」（竹内）のレコードはありません。


LEFT OUTER JOIN で、社員テーブルと、コンディションテーブルを結合してみる。
コンディションテーブルには、member_idが「5」（竹内）のレコードがない為、コンディションテーブルのカラムは NULL となる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    t_condition.*
FROM
    m_member
LEFT OUTER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id;
```
RIGHT OUTER JOIN で、社員テーブルと、コンディションテーブルを結合してみる。
社員テーブルには、member_idが「0」（竹内）のレコードがない為、コンディションテーブルのカラムは NULL となる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    t_condition.*
FROM
    m_member
RIGHT OUTER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id;
```
社員テーブルに、チームテーブルを内部結合、コンディションテーブル・ステータステーブル・勤務時間テーブルを外部結合してみる。
```sql
SELECT
    m_member.number,
    m_member.last_name,
    m_member.first_name,
    m_member.sort,
    m_team.team_name,
    m_status.status,
    m_worktime.worktime,
    t_condition.comment
FROM
    m_member
INNER JOIN
    m_team
ON
    m_member.team_id = m_team.team_id
LEFT OUTER JOIN
    t_condition
ON
    m_member.member_id = t_condition.member_id
LEFT OUTER JOIN
    m_status
ON
    t_condition.status_id = m_status.status_id
LEFT OUTER JOIN
    m_worktime
ON
    t_condition.worktime_id = m_worktime.worktime_id;
```

## INSERT
INSERT はデータの登録を行う命令文です。

```sql
INSERT INTO テーブル名 (カラム名 [, カラム名...]) VALUES ('値1' [, '値2'...]);
```
竹下誠一郎さんを社員テーブルに追加します。
必須項目（デフォルト値やAUTO_INCREMENTの設定がないカラム）に、値をセットしないとエラーになります。
```sql
INSERT INTO m_member (last_name, first_name) VALUES ('竹下' , '誠一郎');
```
```sql
INSERT INTO m_member (last_name, first_name, sort, input_at, update_at) VALUES ('竹下' , '誠一郎', 9, CURRENT_TIMESTAMP, NOW());
```
## UPDATE
UPDATE はデータの更新を行う命令文です。

```sql
UPDATE テーブル名 SET カラム名 = '値'[, カラム名 = '値2'...] WHERE 検索条件;
```
検索条件を指定しないと、全てが対象。
下記で社員の del という削除フラグが 1 になります。IM DIV一掃です。（del = 0 で元に戻してください）
```sql
UPDATE m_member SET del = 1;
```
竹下誠一郎（member_idが「13」）さんをエンジニアチーム（チームIDが「3」）に変更します。
```sql
UPDATE m_member SET team_id = 3 WHERE member_id = 13;
```

## DELETE
DELETE はデータの削除を行う命令文です。

```sql
DELETE FROM テーブル名 WHERE 検索条件
```
竹下さんが加入してくれたので、竹内さんを削除します。
```sql
DELETE FROM m_member WHERE member_id = 5;
```
```sql
SELECT
    team_id, number, last_name, first_name, sort
FROM
    m_member
WHERE
    team_id = 3
ORDER BY
    sort ASC;
```

## おまけ
現在の AUTO_INCREMENT の値を確認する
```sql
SELECT auto_increment FROM information_schema.tables WHERE table_schema = 'oruca' and table_name = 'm_member';
```