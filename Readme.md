**GangDou Create a Bakend**


**改了几个BUG，我好划水(改了点东西糊了个api文档)**


**现在的能接收文件，然而断点续传还没做(emmmm，有个想法，但还没写)**


**last update:20171217**

---

**GET /**
            
```
reshead{
    status : 301
    -->/console/index.html
}
```

---

**GET /console/:id**
```
@ res{
    ...(binary/....)
}
```

## upload-handles 
the two api above should be use to add an file to the server

---

**POST /uoload**

upload a piece of file
```
@ req{
    id:...(string)
    data:...(binary)
    tag:...(intager)
    complete: true/false
}
@ res{
    status:1/0
}
```

---

**POST /insert**

add an file
```
@ req{
    id : ...(string)
    title : ...(string)
    description : ...(string)
    author : ...(string)
    date : yy-mm-dd-hh-MM-ss(date)
    directory : ...(string)[optional]
    file : ...(string)
    view : 0
}
@ res{
    status: 0/1
}
```

---

**POST /edit**

edit an file
```
@ req{
    id : ...(string)
    title : ...(string)
    description : ...(string)
    author : ...(string)
    date : yy-mm-dd-hh-MM-ss(date)
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














