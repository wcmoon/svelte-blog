<script context="module">
/** @type {import('./[title]').Load} */
export async function load({ params, fetch, session, stuff }) {
  const url = `https://cms.example.com/article/${params.slug}.json`;
  const response = await fetch(url);

  return {
    status: response.status,
    props: {
      article: response.ok && (await response.json())
    }
  };
}
</script>
