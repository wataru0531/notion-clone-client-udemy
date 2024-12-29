/**************************************************************



***************************************************************/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import authApi from "../api/authApi";


const Register = () =>  {
  const navigate = useNavigate();

  // ローディング判定
  const [ isLoading, setIsLoading ] = useState(false)

  // エラーが出た際のテキスト表示
  const [ usernameErrText, setUsernameErrText ] = useState("");
  const [ passwordErrText, setPasswordErrText ] = useState("");
  const [ confirmPasswordErrText, setConfirmPasswordErrText ] = useState("");

  // 非同期で処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);

    // エラーのテキストは非表示
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // console.log(data)

    // ユーザー名   trim()...空白を削除
    const username = data.get("username").trim(); 
    // パスワード
    const password = data.get("password").trim();
    // 確認用パスワード
    const confirmPassword = data.get("confirmPassword").trim();
    // console.log(username, password, confirmPassword)

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
    if(confirmPassword === ""){
      error = true;
      setConfirmPasswordErrText("確認用パスワードを入力してください");
    }

     // パスワードと確認用パスワードが違う場合
    if(password !== confirmPassword){
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります");
    }

    if(error) return;     // エラーがあった場合は処理を終わらせる
    setIsLoading(false)   // ローディングも終わらせる


    // 新規登録APIを叩く
    try{
      // リクエストのbody部分になる
      const res = await authApi.register({ 
        username, 
        password, 
        confirmPassword 
      })

      localStorage.setItem("token", res.token);  // ローカルストレージに保存
      console.log("新規登録に成功しました")
      setIsLoading(false)                        // ローディングも終わらせる

      navigate("/");
      
    }catch(error){
      // console.log(error)
      const errors = error.data.errors; // エラーメッセージを取得
      // console.log(errors)

      // エラーメッセージをステートに格納
      errors.forEach(error => {
        if(error.param === "username"){
          setUsernameErrText(error.msg)
          // console.log(usernameErrText)
        }
        if(error.param === "password"){
          setPasswordErrText(error.msg)
        }
        if(error.param === "confirmPassword"){
          setConfirmPasswordErrText(error.msg);
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
        <TextField 
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
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
          アカウント作成
        </LoadingButton>

      </Box>

      <Button
        component={ Link }
        to="/login"
      >
        既にアカウントを持っていますか?
      </Button>
    </>
  )
}

export default Register;