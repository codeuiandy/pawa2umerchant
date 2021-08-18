import React,{useEffect} from 'react'
import Table from './table'
import { httpGetMain, httpPatchMain } from '../../../helpers/httpMethods';
import { NotificationManager } from 'react-notifications';

export default function Index() {
    useEffect(() => {
        getTransactions()
    }, [])
    const getTransactions=async()=>{
let res = await httpGetMain(`merchant/transactions`)
if (res) {
    if (res.er) {
      return  NotificationManager.error(res.er.message)
        
    }
    console.log(res);
    
}
    }
    return (
        <div>
        
            <Table />
        </div>
    )
}
