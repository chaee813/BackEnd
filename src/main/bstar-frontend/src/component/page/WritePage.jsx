import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import CommentBox from "../ui/CommentBox";
import { Button } from '@mui/material';
import { CountertopsSharp } from "@mui/icons-material";
import DetailList from "../list/DetailList"
import { Input } from "antd"
import axios from "axios";
import Sidebar from "./Sidebar";

//화면의 중앙에 위치시킴
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

/*const CreateList = () => {
    const [countList, setCountList] = useState([0])

    function onAddWrite(){
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        CountertopsSharp.push(counter)
        setcountList(countArr)

    }
}

<TextInput>
                    {props.countList && props.countList.map((item, i) => (
                        <div key={i}>
                        height={480}
                        value={content}
                        placeholder={'내용을 입력하세요'}
                        onChange={(event) => {
                            setContent(event.target.value);
                        }}
                    </div>
                    ))}
                </TextInput>
*/

const { TextArea } = Input

function WritePage(props) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image,setImage] = useState("");
    const [content1,setContent1] = useState("");

    // [0, 1, 2, 3]
    const [countList, setCountList] = useState([0]);

    const onAddWrite = () => {
    }

    function onWrite() {
        axios.post('/posts',
            JSON.stringify({
                title: title,
                content: content,
            }),
            {
                headers:
                    {"Content-Type": 'application/json'}
            }).then((res) => {
            alert("글을 등록하였습니다");
            console.log(res.data);
            window.location.href = '/main';
        }).catch(error => {
            console.log("실패");
        });
        axios.post('/pictures',
            JSON.stringify({
                postId: 1,
                pictureUrl: image,
                pictureContent: content1
            }),
            {
                headers:
                    {"Content-Type": 'application/json'}
            }).then((res) => {
            console.log(res.data);
            window.location.href = '/main';
        }).catch(error => {
            console.log("실패");
        });
    }

    const setPreviewImg = (event) => {

        let reader = new FileReader();
        reader.onload = function(event) {
            setImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }


    return (
        <Wrapper>
            <Sidebar/>
            <Container>
                <TextArea
                    type="text" value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    autoSize={{minRows: 1, maxRows: 1}}/>
                <TextArea
                    type="text" value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    autoSize={{minRows: 1, maxRows: 1}}/>

                <div>
                    <input type="file" id="image" accept="image/*"
                           style={{border: "solid 1px lightgray", borderRadius: "5px"}}
                           onChange={setPreviewImg}/>
                    <br></br>
                    <img src={image} style={{maxWidth:"500px"}}></img>
                    <TextArea
                        type="text" value={content1}
                        onChange={(e) => {
                            setContent1(e.target.value);
                        }}
                        autoSize={{minRows:3, maxRows:3}}/>
                </div>

                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ //css 적용
                        mt: 3,
                        pr: 11,
                        pl: 11,
                        color: 'white',
                        border: '1px solid skyblue',
                        borderRadius: '10px',
                        backgroundColor: 'skyblue',
                        // "&.Mui[mui이름]-root:[event 속성]" : {}로 기본적으로 적용된 css를 변경시킬 수 있다.
                        // "&.MuiButton-root:hover" : {}로 기본적으로 탑재되어있는 css를 바꿈
                        "&.MuiButton-root:hover": {
                            color: 'skyblue',
                            borderColor: 'skyblue'
                        }
                    }}
                    onClick={onAddWrite}>글 추가
                </Button>

                <Button
                    type="button"
                    variant="outlined"
                    sx={{ //css 적용
                        mt: 3,
                        pr: 11,
                        pl: 11,
                        color: 'white',
                        border: '1px solid skyblue',
                        borderRadius: '10px',
                        backgroundColor: 'skyblue',
                        // "&.Mui[mui이름]-root:[event 속성]" : {}로 기본적으로 적용된 css를 변경시킬 수 있다.
                        // "&.MuiButton-root:hover" : {}로 기본적으로 탑재되어있는 css를 바꿈
                        "&.MuiButton-root:hover": {
                            color: 'skyblue',
                            borderColor: 'skyblue'
                        }
                    }}
                    onClick={onWrite}>글 올리기</Button>

            </Container>
        </Wrapper>
    );
}

export default WritePage;