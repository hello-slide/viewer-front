/**********************************************************
 * Slides
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Text,
  Wrap,
  Flex,
  WrapItem,
  Box,
  ChakraComponent,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {ContextMenu, ContextMenuTrigger} from 'react-contextmenu';
import {
  IoAdd,
  IoTimeOutline,
  IoAlertCircleOutline,
  IoTrashOutline,
  IoOpenOutline,
} from 'react-icons/io5';
import Slide from '../../@types/slides';
import updateDate from '../../utils/date/updateDate';
import DeleteSlide from './DeleteSlide';
import SlideInfo from './SlideInfo';

const Slides: React.FC<{slides: Slide[]; onOpen: () => void}> = ({
  slides,
  onOpen,
}) => {
  const deleteSlideModal = useDisclosure();
  const detailModal = useDisclosure();
  const [deleteSlide, setDeleteSlide] = React.useState<Slide>();
  const [show, setShow] = React.useState(false);
  const [details, setDetails] = React.useState<Slide>();

  const ListContents: ChakraComponent<'div', {}> = props => {
    return (
      <WrapItem>
        <Box
          width="250px"
          height="100px"
          borderWidth="1.5px"
          borderRadius="lg"
          {...props}
        >
          {props.children}
        </Box>
      </WrapItem>
    );
  };

  const DateInfo: React.FC<{createDate: Date; lastChangeDate: Date}> = ({
    createDate,
    lastChangeDate,
  }) => {
    const [update, setUpdate] = React.useState(false);

    // Re-render every minute to update the date and time.
    React.useEffect(() => {
      let isMounted = true;
      setTimeout(() => {
        if (isMounted) {
          setUpdate(!update);
        }
      }, 61000);

      return () => {
        isMounted = false;
      };
    }, [update]);

    return (
      <Text marginLeft=".5rem">{updateDate(lastChangeDate, createDate)}</Text>
    );
  };

  const handleChange = (id: string) => {
    // TODO: Jump to edit page
    console.log(id);
  };

  return (
    <>
      <Wrap
        spacing="40px"
        marginX={{base: '5%', sm: '10%', md: '13%', lg: '17%'}}
      >
        {slides.map(value => {
          const createDate = new Date(value.createDate);
          const lastChangeDate = new Date(value.lastChange);
          return (
            <React.Fragment key={value.id}>
              <ContextMenuTrigger id={value.id}>
                <ListContents
                  padding=".5rem"
                  onClick={() => {
                    handleChange(value.id);
                  }}
                  cursor="pointer"
                >
                  <Text fontWeight="bold" fontSize="1.2rem" marginBottom="1rem">
                    {value.title}
                  </Text>
                  <Flex alignItems="center" fontSize=".9rem">
                    <IoTimeOutline size="17" />
                    <DateInfo
                      createDate={createDate}
                      lastChangeDate={lastChangeDate}
                    />
                  </Flex>
                </ListContents>
              </ContextMenuTrigger>
              <ContextMenu
                id={value.id}
                onShow={() => {
                  setShow(true);
                }}
                onHide={() => {
                  setShow(false);
                }}
              >
                <Menu isOpen={show}>
                  <MenuList padding={0}>
                    <Text
                      fontSize="1rem"
                      fontWeight="bold"
                      padding="1rem 0 1rem 1rem"
                    >
                      {value.title}
                    </Text>
                    <MenuDivider margin="0" />
                    <MenuItem
                      padding=".5rem 0 .5rem 1rem"
                      icon={<IoOpenOutline size="18px" />}
                    >
                      開く
                    </MenuItem>
                    <MenuItem
                      padding=".5rem 0 .5rem 1rem"
                      onClick={() => {
                        setDetails(value);
                        detailModal.onOpen();
                      }}
                      icon={<IoAlertCircleOutline size="18px" />}
                    >
                      詳細
                    </MenuItem>
                    <MenuItem
                      height="100%"
                      padding=".5rem 0 .5rem 1rem"
                      onClick={() => {
                        deleteSlideModal.onOpen();
                        setDeleteSlide(value);
                      }}
                      icon={<IoTrashOutline size="18px" />}
                    >
                      削除
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ContextMenu>
            </React.Fragment>
          );
        })}
        <ListContents onClick={onOpen} cursor="pointer">
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <IoAdd size="50" />
          </Flex>
        </ListContents>
      </Wrap>
      <DeleteSlide
        slide={deleteSlide}
        onClose={deleteSlideModal.onClose}
        isOpen={deleteSlideModal.isOpen}
      />
      <SlideInfo
        onClose={detailModal.onClose}
        isOpen={detailModal.isOpen}
        slide={details}
      />
    </>
  );
};

export default Slides;
