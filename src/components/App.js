import { useEffect, useState } from "react";

function App(){

    const [sentences, setSentences] = useState([]);

    const reloadData = async() => {
        try{
            const response = await fetch('http://localhost:5174/content');
            const result = await response.json();
            console.log('data received: ', result.content);
            let content = result.content;
            let sentences = content.split('</s>');
            console.log('check1: ', sentences);
            let sen2 = sentences.filter(ele => ele.includes('<s>'));
            console.log('check2: ', sen2);
            let sen3 = sen2.map(ele =>{
                return ele.split('<s>')[1];
            });
            console.log('check3: ', sen3);
            setSentences(sen3);
        }catch(err){
            console.log('API error: ', err);
        }finally{
            console.log('data fetching done');
        }
    } 

    useEffect(() => {

        const fetchData = async() => {
            try{
                const response = await fetch('http://localhost:5174/content');
                const result = await response.json();
                console.log('data received: ', result.content);
                let content = result.content;
                let sentences = content.split('</s>');
                console.log('check1: ', sentences);
                let sen2 = sentences.filter(ele => ele.includes('<s>'));
                console.log('check2: ', sen2);
                let sen3 = sen2.map(ele =>{
                    return ele.split('<s>')[1];
                });
                console.log('check3: ', sen3);
                setSentences(sen3);
            }catch(err){
                console.log('API error: ', err);
            }finally{
                console.log('data fetching done');
            }
        }

        fetchData();
    },[]);

    const handlePlay = e => {
        try{
            alert('sorry couldnt complete this part, was not familiar with the window speech syntheses API');
        }catch(err){
            console.log('err in handlePlay: ', err);
        }
    }

    const handlePause = e => {
        try{
            alert('sorry couldnt complete this part, was not familiar with the window speech syntheses API');
        }catch(err){
            console.log('err in handlePause: ', err);
        }
    }

    const handleReload = e => {
        try{
            reloadData();
        }catch(err){
            console.log('err in handleReload: ', err);
        }
    }

    return(
        <>
            <h1>Parsed Sentences</h1>
            {sentences && sentences.map((sentence, index) => (
                <div key={index}>
                    {sentence}
                </div>
            ))}
            {sentences && (
                <>
                    <br/><br/>
                    <button onClick={handlePlay}>Play</button><br/><br/>
                    <button onClick={handlePause}>Pause</button><br/><br/>
                    <button onClick={handleReload}>Load new content</button>
                </>
            )}
        </>
    )
}

export default App;