## 创建thread
``` cpp
int pthread_create(pthread_t *thread, pthread_attr_t *attr, void *(*routine)(void *),void *args)
```

返回值为0则为正常，非0为非正常

attr为NULL即为默认设置
```cpp
void pthread_attr_init(pthread_attr_t *attr)
void pthread_attr_setdetachstate(pthread_attr_t *attr, detachableset(PTHREAD_JOINABLE/...))
```

## 结束进程

1.return
2.(in process)pthread_exit(NULL/retval)
3.pthread_cancel(thread)
4.(in process)exec()/exit()
```cpp
void pthread(void *retval)
int pthread_cancel(pthread_t thread)
```

## 阻塞

阻塞进程:attr joinable(显式设置)
```cpp
int pthread_join(pthread_t threadid, void **val_ptr)
```

非阻塞:attr detachable(显式设置)
注意detach分离操作只限于joinable的进程
```cpp
void pthread_detach(pthread_t thread)
```

## 堆栈管理
```cpp
void pthread_attr_setstacksize(pthread_attr_t *attr, stacksize)
size_t pthread_attr_getstacksize(pthread_attr_t *atrr, stacksize)
```

## 其他函数
pthread_self()
pthread_equal(thread1, thread2)
比较两个thread,相同则返回一个非零值,不同则返回0

## 互斥锁Mutex
保护共有资源
```cpp
pthread_mutex_t mymutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_init (mutex,attr)
pthread_mutex_destroy (pthread_mutex_t *mutex)
pthread_mutexattr_init (attr)
pthread_mutexattr_destroy (attr)
phtread_mutex_lock(pthread_mutex_t *mutex)
phtread_mutex_trylock(pthread_mutex_t *mutex)
phtread_mutex_unlock(pthread_mutex_t *mutex)
```

## 条件变量
。。。

