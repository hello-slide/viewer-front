/**********************************************************
 * Edit contents: Quiz
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  Input,
  ButtonGroup,
  IconButton,
  Heading,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import React from 'react';
import {IoAddOutline, IoRemoveOutline} from 'react-icons/io5';
import ColorPalette from './ColorPalette';

const QuizEdit: React.FC<{id: string}> = ({id}) => {
  const [title, setTitle] = React.useState('');
  const [answers, setAnswers] = React.useState<string[]>(['']);

  const [backgroundColorType, setBGColor] = React.useState('0');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target.value;
    setTitle(element);
  };

  return (
    <Box
      maxHeight="100%"
      overflow="scroll"
      css={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box margin="2rem 1rem 1rem">
        <Box>
          <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
            1. クイズの問題
          </Heading>
          <Box>
            <Input
              placeholder="問題"
              size="md"
              margin="1rem"
              width="50rem"
              value={title}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box>
          <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
            2. 選択肢
          </Heading>
          {answers.map((value, index) => {
            return (
              <Box key={index} width="100%" margin="1rem">
                <Input
                  placeholder={`選択肢 ${index + 1}`}
                  size="md"
                  width="50rem"
                  defaultValue={value}
                />
              </Box>
            );
          })}
          <ButtonGroup isAttached size="sm" margin="0 0 .5rem 1rem">
            <IconButton
              aria-label="add answer"
              icon={<IoAddOutline size="20px" />}
              onClick={() => {
                if (answers.length <= 3) {
                  const newValue = [...answers];
                  newValue.push('');
                  setAnswers(newValue);
                }
              }}
            />
            <IconButton
              aria-label="remove answer"
              icon={<IoRemoveOutline size="20px" />}
              onClick={() => {
                if (answers.length > 1) {
                  const newValue = [...answers];
                  newValue.pop();
                  setAnswers(newValue);
                }
              }}
            />
          </ButtonGroup>
        </Box>
        <Box>
          <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
            3. 背景の設定
          </Heading>
          <RadioGroup onChange={setBGColor} value={backgroundColorType}>
            <Stack spacing={4} direction="row">
              <Radio value="0">塗りつぶし</Radio>
              <Radio value="1">グラデーション</Radio>
            </Stack>
          </RadioGroup>
          <ColorPalette text="背景色" />
        </Box>
      </Box>
    </Box>
  );
};

export default QuizEdit;
