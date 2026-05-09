// expressをこのファイルで使えるように変数に入れる
const { render } = require("ejs");
const express = require("express");

// expressを実行したものをapp変数に入れる
const app = express();

// portを定数で定義する
const port = 3000;

// pathというモジュールを取得する
const path = require("path");

// デフォルトではエクスプレスはviewsファイルを見にいくが、これはどこのディレクトリでサーバーを起動したかに依存する
// cd .. で一個上のディレクトリから node template/index.js というようにサーバーは起動はできるが、ページを読み込むとエラーが出てしまう
// どこから実行しても正常に実行して欲しい場合はデフォルトの設定を変える必要がある
app.set("views", path.join(__dirname, "views"));
// app.setでこのファイルの設定を行う。
// viewsに設定するからviewsを第一引数に置く
// 第二引数にパスの設定を行う。pathでjoinというメソッドを使う（このメソッドに渡された文字列を組み合わせて一つのパスを作り上げることが簡単にできる）
// 第一引数に __dirname という変数を置く（node.jsの特別な変数で今実行してるファイルが存在してるディレクトリへの絶対パスを返してくれる（index.jsが存在してるtemplating_demoまでの絶対パスを返してくれる））
// 第二引数に views を置く（最後に views というパスを追加）

// ejsを使えるようにする（setはこのファイルの設定みたいなもの）
// このコードはエクスプレスのドキュメントに書いてあるルール
app.set("view engine", "ejs");

// renderを使うことで第一引数のファイルを表示させることができる（エクスプレスはデフォルトでviewsの中身を見にいく）
app.get("/", (req, res) => {
    res.render("home");
});

// subredditなテンプレートデモ
// :~でパラーメタを変数にできる
app.get("/r/:subreddit", (req, res) => {
    // reqでパラメータの値を取得する(paramsが/r/以下の値)これをsubredditという変数に代入する
    // {}これは分割代入
    const { subreddit } = req.params;
    res.render("subreddit", { subreddit });
});

// テンプレートにデータを渡す
app.get("/rand", (req, res) => {
    // ロジックをここで書いて、変数に代入する
    const num = Math.floor(Math.random() * 10) + 1;
    // render の第二引数にオブジェクトとして代入する
    // テンプレートの方でrandというキーでnumの値を呼び出すことができる。
    res.render("random", { rand: num });
    // ちなみにキーと値が同じ時は { num } という風に省略することができる。左の例だとnumというキーにnumという値
});

// サーバー起動
app.listen(port, () => {
    console.log("ポート3000で待受中。。。");
});
