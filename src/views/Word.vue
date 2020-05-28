<template>
    <div>
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
            wordVoices: []
        }
    },
    created() {
        let param = {
            url: '/getWord',
            param: {
                page: 1,
                pageSize: 10
            }
        }
        word(param).then(res => {
            this.wordList = res.data
        })
    },
    methods: {
        handlePlay() {
            const that = this
            //获取元素
            let audio = document.querySelector('#wordAudio');
            //循环次数 audio src数组
            for(let i = 0; i < this.loopCount; i++){
                this.wordVoices.push("http://dict.youdao.com/dictvoice?audio="+this.wordList[this.currentIndex].word+"&type=1")
                this.wordVoices.push("https://fanyi.baidu.com/gettts?lan=zh&text="+this.wordList[this.currentIndex].paraphrase+"&spd=5&source=web")
            }
            console.log(this.wordVoices)
            //首个src
            let src = this.wordVoices.shift();
            audio.src = src;
            console.log(this.wordVoices)
            //播放完触发
            audio.addEventListener('ended', function() {
                console.log(that.wordVoices.length)
                if(that.wordVoices.length > 0) {
                    audio.src = that.wordVoices.shift()
                    audio.play()
                    console.log(audio.src)
                }else {
                    if(that.wordList.length > that.currentIndex) {
                        that.currentIndex = ++that.currentIndex;
                        that.handlePlay() 
                    }
                }
            });
            
            audio.play();
        },
    }
}
</script>

<style scoped>

</style>