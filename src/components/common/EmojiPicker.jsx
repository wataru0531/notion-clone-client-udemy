/**************************************************************

メモのアイコン

***************************************************************/
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import  Picker  from "@emoji-mart/react";


const EmojiPicker = ({ icon, onChange}) => {
  // console.log(props)

  // propsで流れてきた絵文字をを状態変数で持っておく
  const [ selectedEmoji, setSelectedEmoji ] = useState();
  const [ isShowPicker, setIsShowPicker ]   = useState(false);
  // console.log(isShowPicker)

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [ icon ]);

  // 絵文字ピッカーの display: noneかblockか を切り替える
  const onClickSetIsShowPicker = () => {
    setIsShowPicker(prev => !prev)
  }

  // 絵文字ピッカーの絵文字を取得
  const onEmojiSelect = (e) => {
    // console.log(e)

    // 絵文字のコードを取得。分かれているものもあるので、- の部分を境に ""で囲ってやる
    const emojiCodes = e.unified.split("-");
    // console.log(emojiCodes)

    // 絵文字のコードを格納していく 先頭の全てに0xがつくように
    const codesArray = [];
    emojiCodes.forEach(emojiCode => {
      codesArray.push(`0x${emojiCode}`)
    })
    // console.log(codesArray)

    // コードを絵文字に変換 
    // fromCodePoint...Unicodeコードポイントから文字列を作成
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji)

    onChange(emoji);

    setIsShowPicker(false)
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Typography 
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={ onClickSetIsShowPicker }
      >
        { selectedEmoji }
      </Typography>

      <Box 
        sx={{ 
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        {/* emoji-mart使用 */}
        <Picker onEmojiSelect={ onEmojiSelect } />  
      </Box>
      
    </Box>
  )
}

export default EmojiPicker;