import Vue from 'vue';
var createTransferTableSql='CREATE TABLE IF NOT EXISTS transfer (id unique,fileNum,fileName,fondsId,fkSecretName,fkTypeId,fkTypeName,boxName,locationName,integrity,state,allowBorrow)';
var createBorrowTableSql='CREATE TABLE IF NOT EXISTS borrow (id unique,fileNum,fileName,fondsId,fkSecretName,fkTypeId,fkTypeName,boxName,locationName,integrity,state,allowBorrow)';
//执行sql

const Websql=function(tableName,sql,data,callback){
    if(!callback){ return;}
    if(window.openDatabase){
        var db = openDatabase('mydb', '1.0', 'webDB', 2 * 1024 * 1024);
    }
    if(!db){
        console.log('数据库创建失败！');
    }else{
        db.transaction(function (tx) {
            if(tableName==='borrow'){ 
                tx.executeSql(createBorrowTableSql)
            }
            if(tableName==='transfer'){
                tx.executeSql(createTransferTableSql)
            }
            tx.executeSql(sql,data,function (tx, result) {
                callback(true,result)
            },function (tx,error) {
                callback(false,error)
            })
        })
    }
};
export default Websql;