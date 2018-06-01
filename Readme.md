**GangDou Create a Bakend**


**改了几个BUG，我好划水(改了点东西糊了个api文档)**


**现在的能接收文件，然而断点续传还没做(emmmm，有个想法，但还没写)**


**last update:20171217**

## Home
---

GET /
            
```
reshead{
    status : 301
    -->/console/index.html
}
```

## Files 
the two api above should be use to add an file to the server

---

POST /console/upload

upload a piece of file
```
@ req{
    id:...(string)
    tag:...(number)
    complete: true/false
    
    file:...(binary)
}
@ res{
    status: ...(string)
}
```

GET /console/list
list all files in the dir
```
@ res{
    status: ...(string)
}
```

GET /console/delete
delete a file
```
@ req{
    name:...(string){PS: filename}
}
@ res{
    status: ...(string)
}

```

---

## Infomations
POST /insert

add an file
```
@ req{
    id : ...(string)
    name : ...(string)
    des : ...(string)
    author : ...(string)
    time : yy-mm-dd-hh-MM-ss(string)
}
@ res{
    status: 0/1
}
```

---

POST /edit

edit an file
```
@ req{
    id : ...(string)
    name : ...(string)
    des : ...(string)
    author : ...(string)
    time : yy-mm-dd-hh-MM-ss(string)
}
@ res{
    status:0/1
}
```

**POST /delete**
delete an file
```   
@ req{
    id/title : ...(string)
}
@ res{
    status:0/1
}
```

**GET /list**
```
@ res{
    status:0/1
    filelist:...(json)
}
```

**-------------------------------------------------------------------------------**














