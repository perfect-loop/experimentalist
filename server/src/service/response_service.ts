import HumorResponse from "../models/humor_response";
import unirest from "unirest";

interface Tuple {
  key: number;
  value: string;
}

interface UnirestResponse {
  error?: string;
  raw_body: string;
}

interface UnirestData {
  images: {
    downsized_large: {
      url: string;
    };
  };
}
interface UnirestBody {
  data: UnirestData[];
}

type FrequencyMap = Map<number, string>;

export default class ResponseService {
  private readonly apiKey = "vqk8Q7egIcMIIJSCUyNzg4bPgdtgaH4T";
  private readonly giphyLimit = 5;
  private readonly rapidApiHeaders = {
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key": " 7d2151af70msh424e23ef704fe57p1860a5jsn62d5461722e8",
  };

  public process(message: string): Promise<HumorResponse> {
    // let frqMap: FrequencyMap = new Map();
    let rarestWord = "";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keywords: string[] = message.match(/\b(\w+)\b/g)!;

    // return a promise with HumorObject
    return this.mapFrequencies(keywords)
      .then((map: FrequencyMap) => {
        rarestWord = this.findRarestWord(map, rarestWord);
      })
      .then(() => {
        return this.queryGiphy(rarestWord, message);
      });
  }

  private findRarestWord(map: FrequencyMap, rarestWord: string) {
    console.log("My frequency map is");
    console.log(map);
    // sort the map in ascending order by the frequency.The rarest word first.
    // the most common word will be last.
    const frqMap = new Map(
      [...map].sort((a, b): any => {
        if (a[0] > b[0]) return 1;
        if (a[0] === b[0]) return 0;
        if (a[0] < b[0]) return -1;
      }),
    );
    // get the rarest word
    rarestWord = frqMap.values().next().value;
    console.log("Sorted frequency map is");
    console.log(frqMap);
    return rarestWord;
  }

  private queryGiphy(rarestWord: string, message: string) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${rarestWord}&api_key=${this.apiKey}&limit=${this.giphyLimit}`;
    console.log("Giphy url  = " + url + "\n");
    return new Promise<HumorResponse>((resolve, reject) => {
      unirest("GET", url).end((response: UnirestResponse) => {
        if (response.error) {
          reject(response.error);
        }
        const body: UnirestBody = JSON.parse(response.raw_body);
        const links = [
          body.data[0].images.downsized_large.url,
          body.data[1].images.downsized_large.url,
          body.data[2].images.downsized_large.url,
          body.data[3].images.downsized_large.url,
          body.data[4].images.downsized_large.url,
        ];
        console.log("link = " + links);
        if (links) {
          resolve(new HumorResponse(message, [rarestWord], links));
        } else {
          reject("No GIF url found.");
        }
      });
    });
  }

  /**
   * This method returns a Map of between frequencies of the words per million and words.
   * @param keywords
   */
  private async mapFrequencies(keywords: string[]): Promise<FrequencyMap> {
    const frequencyMap: FrequencyMap = new Map();
    const prs = this.promises(keywords);
    return new Promise((resolve, reject) => {
      Promise.all(prs)
        .then(tuples => {
          tuples.forEach(tuple => {
            frequencyMap.set(tuple.key, tuple.value);
          });
        })
        .then(() => {
          resolve(frequencyMap);
        });
    });
  }

  private promises(keywords: string[]) {
    const promises: Promise<Tuple>[] = [];
    for (const word of keywords) {
      promises.push(this.getFrequency(word));
    }
    return promises;
  }

  /**
   * Function to return frequency of the word
   * @param word
   */
  private getFrequency = (word: string): Promise<Tuple> => {
    return new Promise((resolve, reject) => {
      const url = "https://wordsapiv1.p.rapidapi.com/words/" + word + "/frequency";
      unirest("GET", url)
        .headers(this.rapidApiHeaders)
        .end((response: any) => {
          if (response.error) {
            console.log("Wordsapi response error.");
            reject(response.error);
          }
          const body = JSON.parse(response.raw_body);

          if ("frequency" in body) {
            const frequency = body.frequency.perMillion;
            console.log("getFrequency: word = " + word + " frequency=" + frequency);

            resolve({ key: frequency, value: word });
          } else {
            console.log("Frequency not found in Wordsapi response for word = " + word);
            resolve({ key: 1000, value: word });
          }
        });
    });
  };

  /**
   * This method determines appropriate image to send back to the user
   * based on their message
   *
   * @param message message from the user
   */
  private determineLink(message: string) {
    if (message.indexOf("cat") > -1) {
      return "https://media.giphy.com/media/JPhJwG1pW4kINV4VTx/giphy.gif";
    }
  }
}
