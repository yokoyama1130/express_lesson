// expressをこのファイルで使えるように変数に入れる
const { render } = require("ejs");
const express = require("express");

// expressを実行したものをapp変数に入れる
const app = express();

// portを定数で定義する
const port = 3000;

// ejsを使えるようにする（setはこのファイルの設定みたいなもの）
// このコードはエクスプレスのドキュメントに書いてあるルール
app.set("view engine", "ejs");

// renderを使うことで第一引数のファイルを表示させることができる（エクスプレスはデフォルトでviewsの中身を見にいく）
app.get("/", (req, res) => {
    res.render("home");
});





// サーバー起動
app.listen(port, () => {
    console.log("ポート3000で待受中。。。");
});


