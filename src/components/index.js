import React, { Component } from 'react'
import { IconConverter, IconBuilder } from "icon-sdk-js";
import { requestAddress, requestJsonRpc } from '../others/iconex'

export default class Wedding extends Component {
    constructor(props) {
        super(props)
        this.state = {
          walletAddress:null
        }
      }
      buildTx = () => {
        const { CallTransactionBuilder } = IconBuilder;
        let params = {
          bridegroom:this.state.bridegroom,
          bride:this.state.bride,
          wedding_ceremony_day:this.state.wedding_ceremony_day
        };
        const transaction = new CallTransactionBuilder()
          .nid('0x1')
          .from(this.state.walletAddress)
          .to("cx10b4af635540963226bd84178c4311286c921b40")
          .stepLimit(IconConverter.toHex(1000000))
          .timestamp(IconConverter.toHex(new Date().getTime() * 1000))
          .version(IconConverter.toHex(3))
          .method("put_wedding_ceremony")
          .params(params)
          .build();
        return transaction;
      };
      handleClickLogin = async () => {
            const walletAddress = await requestAddress();
            this.setState({ walletAddress })    
      }
      handleChange= e =>{
        const { name, value } = e.target
          this.setState({ [name]:value })
      }
      handleClickSave = async ()=>{
          const tx = await this.buildTx();
          console.log(tx)
          const txHash = await requestJsonRpc(tx);
          if(txHash){
            window.open(`https://tracker.icon.foundation/transaction/${txHash.result}`)

          }
        }
    render() {
        return (
            <div className='main'>
                <h2>Congratulations on</h2>
                <h1>Your marriage</h1>
                <p>생에 단 한 번뿐인 날, 당신의 결혼을 블록체인에 기록하세요</p>
                <input className='left' onChange={this.handleChange} type="text" name='bridegroom' placeholder='신랑' value={this.state.groom}/>
                <input type="text" name='wedding_ceremony_day'  placeholder='날짜(2019-06-03)' value={this.state.date} onChange={this.handleChange} />
                <input className='right' name='bride'  type="text" placeholder='신부' value={this.state.bride} onChange={this.handleChange} />
                <div className='button-box'><button onClick={this.handleClickLogin}>로그인</button><button onClick={this.handleClickSave}>기록하기</button></div>
          </div>
        )
    }
}
