//vueアプリの生成

//初期化
function initialize(){
    createApp()
}

document.addEventListener("DOMContentLoaded",initialize.bind(this)) //←初期化の実行(対象.addEventListener(種類,関数,？))


function createApp(){
    //ここにVuejsのコードを書く
    new Vue({
        el: "#wrapper",
        data: {
            filter: "inbox",
            todos: [
                {
                    id: 1,//識別用のID
                    text: "みかんを買う",//テキスト
                    createdAt: 1567940003455,//登録日のUnixタイムスタンプ
                    done: false, //タスクが完了したかどうか
                    isEditing: false //編集中かどうか
                },
                {
                    id: 2,
                    text: "郵便物を出す",
                    createdAt: 1567940003455,
                    done: false,
                    isEditing: false 
                },
                {
                    id: 3,
                    text: "2km走る",
                    createdAt: 1567940003455,
                    done: true,
                    isEditing: false 
                }
            ],
            text:""
        },
        computed:{

            filteredTodos: function(){
                const filter = this.filter
                return this.todos.filter(function(todo){
                    return filter === "completed" ? todo.done : !todo.done
                })
            },
            disabled: function(){
                return this.text === ""
            }
        },
        methods:{
            formatDate: function(timestamp){
                //Unixのタイムスタンプをtimestampという引数として受け取り、Dateオブジェクトを生成
                const date = new Date (timestamp)

                //Dateから年月日を取得
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()

                //年月日の形式で日付を返す
                return year + "." + month + "." + day
            },
            setFilter: function(filter){
                this.filter = filter
            },
            handleSubmit: function(event){
                //event.preventDefault()   ←HTMLで.preventを使用したことにより省略可能になった
                //ここに送信時の処理を書く
                //テキストフィールドの内容をもとにTodoを追加する
                this.addTodo(this.text)

                //テキストフィールドを空にする
                this.text = ""
            },
            addTodo: function(text){
                this.todos.push({
                    id: this.todosLength + 1,
                    text: text,
                    createdAt: Date.now(),
                    none: false,
                    isEditing: false
                })
            },
            editTodo: function(id){
                this.todos = this.todos.map(function(todo){
                    //引数のidを持つtodoを編集中にする
                    if (todo.id === id){
                        todo.isEditing = true
                    }
                    return todo
                })
            },
            saveTodo: function(id){
                this.todos = this.todos.map(function(todo){
                    //引数のidを持つtodoの編集を終了する
                    if (todo.id === id){
                        todo.isEditing = false
                    }
                    return todo
                })
            }
        }
    })
}

