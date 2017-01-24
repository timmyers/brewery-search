import { SEND_ACTION } from 'containers/APIConnection'

export const validateUsername = username => {
	return {
    type    : SEND_ACTION,
    payload : {
    	action: 'validateUsername',
    	params: {
    		username
    	}
    }
  }
}