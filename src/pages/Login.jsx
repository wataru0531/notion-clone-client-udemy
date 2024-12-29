/**************************************************************

ログインページ

***************************************************************/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import authApi from "../api/authApi";


const Login = () =>  {
  const navigate = useNavigate();

  // ローディング判定
  const [ isLoading, setIsLoading ] = useState(false)

  // エラーが出た際のテキスト表示
  const [ usernameErrText, setUsernameErrText ] = useState("");
  const [ passwordErrText, setPasswordErrText ] = useState("");

  // 非同期で処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);

    // エラーのテキストは非表示
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // console.log(data)

    // ユーザー名   trim()...空白を削除
    const username = data.get("username").trim(); 
    // パスワード
    const password = data.get("password").trim();

    let error = false;    // エラーがあれば処理を終わらせる変数
    setIsLoading(false)   // ローディングも終わらせる

    // バリデーションチェック
    if(username === ""){
      error = true;
      setUsernameErrText("名前の入力してください");
    }
    if(password === ""){
      error = true
      setPasswordErrText("パスワードを入力してください");
    }

    if(error) return;     // エラーがあった場合は処理を終わらせる
    setIsLoading(false)   // ローディングも終わらせる


    // 新規登録APIを叩く
    try{
      // リクエストのbody部分になる
      const res = await authApi.login({ 
        username, 
        password, 
      })

      localStorage.setItem("token", res.token);  // ローカルストレージに保存
      console.log("ログインに成功しました")
      setIsLoading(false)                        // ローディングも終わらせる

      navigate("/");
      
    }catch(error){
      // console.log(error)
      const errors = error.data.errors; // エラーメッセージを取得
      console.log(errors)

      // エラーメッセージをステートに格納
      errors.forEach(error => {
        if(error.param === "username"){
          setUsernameErrText(error.msg)
          // console.log(usernameErrText)
        }
        if(error.param === "password"){
          setPasswordErrText(error.msg)
        }
      })

      setIsLoading(false); //ローディングを終わらせる
    }
  }

  return (
    <>
      <Box
        component="form" 
        onSubmit={ handleSubmit }
        noValidate // デフォルトのバリデーションを消す
      >
        <TextField 
          fullWidth 
          id="username" 
          label="お名前"
          margin="normal"
          name="username" 
          required
          error={usernameErrText !== ""} // trueの場合赤くなる。即ちエラーがあった場合
          helperText={usernameErrText}   // helperText ... エラー内容を格納
          disabled={ isLoading }         // ローディング時は入力できなくなる
        />
        <TextField 
          fullWidth
          id="username"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
          disabled={ isLoading }
        />

        <LoadingButton 
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          color="primary"
          variant="outlined"     // 外側のライン
          loading={ isLoading }  // ローディング
        >
          ログイン
        </LoadingButton>

      </Box>

      <Button component={ Link } to="/register">
        アカウントを持っていませんか? 新規登録
      </Button>
    </>
  )
}

export default Login;