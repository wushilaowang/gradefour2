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
        this.loadWord();
        this.pageLoad = true
    },
    methods: {
        //加载单词
        loadWord() {
            let that = this;
            let param = {
                url: '/getWord',
                param: {
                    page: this.currentPage,
                    pageSize: 2
                }
            }
            word(param).then(res => {
                res.data.map(item => {
                    that.wordList.push(item)
                })
            })
        },
        handlePlay() {
            const that = this
            console.log(this.wordList)
            //获取元素
            let audio = document.querySelector('#wordAudio');
            that.loadVoicSrc()
            console.log(this.wordVoices)
            //首个src
            let src = this.wordVoices.shift();
            audio.src = src;
            audio.play();
            console.log(this.wordVoices)
            //播放完触发
            audio.addEventListener('ended', function() {
                console.log(that.wordList.length)
                if(that.wordVoices.length > 0) {//播放列表中还有
                    audio.src = that.wordVoices.shift()
                    audio.play()
                    console.log(audio.src)
                }else {
                    console.log(that.wordList.length > that.currentIndex + 1)
                    if(that.wordList.length > that.currentIndex + 1) {//加载单词的数量 > 当前单词序号
                        that.currentIndex = that.currentIndex + 1;
                        that.loadVoicSrc();
                        audio.src = that.wordVoices.shift();
                        audio.play();
                    }else {//再次加载单词
                        console.log(that.wordVoices)
                        that.currentPage = that.currentPage + 1;
                        that.loadWord();
                        console.log(that.wordList)
                        that.currentIndex = that.currentIndex + 1;
                        that.loadVoicSrc();
                        audio.src = that.wordVoices.shift();
                        audio.play();
                    }
                }
            });
        },
        //加载src
        loadVoicSrc() {
            let arr = this.wordList
            JSON.parse(JSON.stringify(arr))
            console.log(this.currentIndex)
            console.log(arr)
            //循环次数 audio src数组
            for(let i = 0; i < this.loopCount; i++){
                this.wordVoices.push("http://dict.youdao.com/dictvoice?audio="+this.wordList[this.currentIndex].word+"&type=1")
                // this.wordVoices.push("https://fanyi.baidu.com/gettts?lan=zh&text="+this.wordList[this.currentIndex].paraphrase+"&spd=5&source=web")
            }
        }
    }
}
</script>

<style scoped>

[v-cloak] {
    display: none;
}
</style>