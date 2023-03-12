import {  LaunchProps, Clipboard, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import fetch from 'node-fetch';


interface SearchArguments {
  domain: string;
}

export  default async function Command(props: LaunchProps<{ arguments: SearchArguments }>) {
  const { domain } = props.arguments;
      let url = 'https://login.microsoftonline.com/' + domain  + '/federationmetadata/2007-06/federationmetadata.xml';
      console.log(url);
      const response = await fetch(url);
      const result = await response.text();
      const index: number = result.indexOf('entityID="https://sts.windows.net/');
      const size: number = 34
      const resultString: string = result.slice(index + size);
      const resultGuid: string = resultString.substring(0, 36)
      console.log(resultGuid);
      await Clipboard.copy(resultGuid);
      await showToast(Toast.Style.Success, `copied ${resultGuid}`);
      return resultGuid;
}
