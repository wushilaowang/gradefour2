<template>
    <div v-if="wordList.length">
        <div>{{wordList[currentIndex].word}}</div>
        <div>{{wordList[currentIndex].paraphrase}}</div>
        <label>循环次数</label><input v-model="loopCount" />
        <button @click="handlePlay">play</button>
        <audio controls id="wordAudio"></audio>
    </div>
</template>

<script>
import word from '../network/word'
export default {
    name: "Word",
    data() {
        return {
            wordList: [],
            currentIndex: 0,//当前序号
            currentPage: 1,//当前单词页数
            loopCount: 1,//循环次数
            wordVoices: [],
            isPlay: false,//是否播放
            pageLoad: false,
        }
    },
    created() {
        //第一次加载单词
        let that = this;
        let arr = this.loadWord();
        arr.then(res => {
            res.map(item => {
                that.wordList.push(item)
            })
        })
        this.pageLoad = true
    },
    methods: {
        //加载单词
        async loadWord() {
            let that = this;
            let param = {
                url: '/getWord',
                param: {
                    page: this.currentPage,
                    pageSize: 2
                }
            }
            let arr =[]
            await word(param).then(res => {
                arr = res.data
            })
            return arr
        },
        handlePlay() {
            const that = this
            //获取元素
            let audio = document.querySelector('#wordAudio');
            that.loadVoicSrc()
            //首个src
            let src = this.wordVoices.shift();
            audio.src = src;
            audio.play();
            //播放完触发
            audio.addEventListener('ended', function() {
                if(that.wordVoices.length > 0) {//播放列表中还有
                    audio.src = that.wordVoices.shift()
                    audio.src != undefined && audio.play()
                }else {
                    if(that.wordList.length > that.currentIndex + 1) {//加载单词的数量 > 当前单词序号
                        
                        that.loadVoicSrc();
                        audio.src = that.wordVoices.shift();
                        audio.play();
                    }else {//再次加载单词
                        that.currentPage = that.currentPage + 1;
                        let arr = that.loadWord();
                        arr.then(res => {
                            res.map(item => {
                                that.wordList.push(item)
                            })
                            that.loadVoicSrc()
                            audio.src = that.wordVoices.shift();
                            audio.src != undefined && audio.play();
                        }) 
                    }
                }
            });
        },
        //加载src
        loadVoicSrc() {
            //循环次数 audio src数组
            for(let i = 0; i < this.loopCount; i++){
                this.wordVoices.push("http://dict.youdao.com/dictvoice?audio="+JSON.parse(JSON.stringify(this.wordList))[this.currentIndex + 1].word+"&type=1")
                // this.wordVoices.push("https://fanyi.baidu.com/gettts?lan=zh&text="+this.wordList[this.currentIndex].paraphrase+"&spd=5&source=web")
            }
            this.currentIndex = this.currentIndex + 1;
        }
    }
}
</script>

<style scoped>


</style>