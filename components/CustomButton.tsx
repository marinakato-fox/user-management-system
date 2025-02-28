// components/parts/CustomButton.tsx

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {///extends継承 
  variantType?: 'primary' | 'secondary' | 'danger';
}

const CustomButton: React.FC<CustomButtonProps> = ({ variantType = 'primary', ...props }) => {
  let color: ButtonProps['color'] = 'primary';     
    //   ButtonProps['color']→MUIのcolor型　決められた色しか使えない
    //  let backgroundColor = "#c0c0c0" ///デフォルトの色を設定

	// TODO: variantTypeに応じてcolorを変化させる
	// colorに設定する色は調べて実装する
    switch(variantType){
        case 'primary' :
            color = "primary";
        break;
        case 'secondary' :
            color = "secondary";
        break;
        case 'danger' :
            color = "error";
        break;
    }

  return (
		// TODO: <Button>の実装
		// プロップスには[color][variant]を設定し、{...props}を最後に設定する
        <Button 
            variant={props.variant}///variant:スタイルや種類のこと
            color={color}
            // sx={{backgroundColor}} ///sx={{}} CSS を JSX の中で直接書けるスタイルプロパティ
            {...props}/>
  );
}

export default CustomButton;