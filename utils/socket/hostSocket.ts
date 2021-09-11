/**********************************************************
 * connect to host by websocket.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractSocketClient from './abstractSocket';

export default class HostSocket extends AbstractSocketClient {
  constructor() {
    const path = '/sync/host';

    super(path);
  }
}
