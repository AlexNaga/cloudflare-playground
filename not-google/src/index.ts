const HOSTNAME = "google.com";
const NOT_GOOGLE_IMG_URL =
  " https://www.searchenginewatch.com/wp-content/uploads/2018/10/notogoogle-1.png";

class ImageHandler {
  element(element: HTMLElement) {
    element.setAttribute("src", NOT_GOOGLE_IMG_URL);
    element.setAttribute("srcset", NOT_GOOGLE_IMG_URL);
  }
}

class ElementHandler {
  element(element: HTMLElement) {
    element.setInnerContent("🙅‍♀️ Not Google");
  }
}

export default {
  async fetch(
    request: Request,
    env: {},
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = HOSTNAME;
    const fetchRequest: RequestInit<RequestInitCfProperties> = {
      headers: request.headers,
    };

    const originalResponse = await fetch(url.toString(), fetchRequest);

    const transformed = new HTMLRewriter()
      .on("img", new ImageHandler())
      .on("title", new ElementHandler())
      .on("h1", new ElementHandler())
      .transform(originalResponse);

    return transformed;
  },
};
