**GangDou Create a Bakend**


**改了几个BUG，我好划水(改了点东西糊了个api文档)**


**现在的能接收文件，然而断点续传还没做(emmmm，有个想法，但还没写)**


**last update:20171217**


**-----------------------------------------------------------------------**


**GET /(这个要改)**
            reshead{
                status : ...
            }
            resbody{
                ...(binary/text/.....)
            }


**POST /uoload**
            reqbody{
                id:...(string)
                data:...(binary)
                tag:...(intager)
            }
            resbody{
                status:1/0
            }


**POST /insert**
            reqbody{
                'id' : ...(string)
                'title' : ...(string)
                'description' : ...(string)
                'author' : ...(string)
                'date' : yy-mm-dd-hh-MM-ss(date)
                'directory' : ...(string)[Don't neccessary]
                'file' : ...(string)
                'view' : 0
            }
            resbody{
                status:0/1
            }


**POST /edit**
            reqbody{
                'id' : ...(string)
                'title' : ...(string)
                'description' : ...(string)
                'author' : ...(string)
                'date' : yy-mm-dd-hh-MM-ss(date)
            }
            resbody{
                status:0/1
            }


**POST /delete**
            reqbody{
                'id'/'title' : ...(string)
            }
            resbody{
                status:0/1
            }


**GET /list**
            resbody{
                status:0/1
                filelist:...(json)
            }


**-------------------------------------------------------------------------------**














