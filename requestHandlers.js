const fs=require('fs');
const path=require('path');
const zlib=require('zlib');
const mime=require('./mime').types;
const config=require('./config');

function upload(request,response,pathname,dataname) {

console.log("Request handler 'upload' was called."+ dataname);
response.end();

}
function download(request,response,pathname,dataname) {

    console.log("Request handler 'download' was called."+ dataname);
    const realpath='/Users/zhangshengming/Desktop/host/document/'+dataname;
    var ext=path.extname(dataname);
    ext=ext ? ext.slice(1):'unknown';
    const contentType=mime[ext]||"text/plain";
    response.setHeader("Content-Type",contentType);
    fs.stat(realpath,function(err,stat){
        var lastModified=stat.mtime.toUTCString();
        var ifModifiedSince="If-Modified-Since".toLowerCase();
        response.setHeader("Last-Modified",lastModified);
        if(ext.match(config.Expires.fileMatch)){
            var expires=new Date();
            expires.setTime(expires.getTime()+config.Expires.maxAge*1000);
            response.setHeader("Expires",expires.toUTCString());
            response.setHeader("Cache-Control","max-age="+config.Expires.maxAge);
        }
        if(request.headers[ifModifiedSince]&&lastModified==request.headers[ifModifiedSince]){
            response.writeHead(304,"Not Modified");
            response.end();
        }else{
                /*fs.readFile(realpath,"binary",function(error,file){
                    if(error){
                        response.writeHead(500,"Internal Server Error",{'Content-Type':'text/plain'});
                        response.end(error);
                    }else{
                        response.writeHead(200,"OK",{'Content-Type':contentType});
                        response.write(file,"binary");
                        response.end();
                    }
                })
                */
                /*
                var raw=fs.createReadStream(realpath);
                var acceptEncoding=request.headers['accept-encoding']||"";
                var matched=ext.match(config.Compress.match);
                if(matched&&acceptEncoding.match(/\bgzip\b/)){
                    response.writeHead(200,"OK",{'Content-Encoding':'gzip'});
                    raw.pipe(zlib.createGzip()).pipe(response);
                }
                else if(matched&&acceptEncoding.match(/\bdeflate\b/)){
                         response.writeHead(200,"OK",{'Content-Encoding':'deflate'});
                         raw.pipe(zlib.createDeflate()).pipe(response);
                     }
                     else{
                         response.writeHead(200,"OK");
                         raw.pipe(response);
                     }
                */
                var compressHandle=function(raw,statusCode,reasonPhrase){
                    var stream=raw;
                    var acceptEncoding=request.headers['accept-encoding']||"";
                    var matched=ext.match(config.Compress.match);
                    if (matched && acceptEncoding.match(/\bgzip\b/)){
                      response.setHeader("Content-Encoding","gzip");
                      stream=raw.pipe(zlib.createGzip());
                    }else if(matched&&acceptEncoding.match(/\bdeflate\b/)){
                            response.setHeader("Content-Encoding", "deflate");
                            stream=raw.pipe(zlib.createDeflate());
                          }
                    response.writeHead(statusCode,reasonPhrase);
                    stream.pipe(response);
                };
                if(request.headers["range"]){
                    var range=utils.parseRange(request.headers["range"],stats.size);
                    if(range){
                      response.setHeader("Content-Range","bytes "+range.start+"-"+range.end+"/"+stats.size);
                      response.setHeader("Content-Length",(range.end-range.start+1));
                      var raw=fs.createReadStream(realPath,{"start": range.start,"end": range.end});
                      compressHandle(raw,206,"Partial Content");
                    }else{
                      response.removeHeader("Content-Length");
                      response.writeHead(416,"Request Range Not Satisfiable");
                      response.end();
                    }
                }else{
                    var raw=fs.createReadStream(realPath);
                    compressHandle(raw,200,"Ok");
                }
        }
    })
    
}

exports.upload = upload;
exports.download = download;