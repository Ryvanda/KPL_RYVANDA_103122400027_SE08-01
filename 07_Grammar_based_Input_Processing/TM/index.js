/**
 * @param {string} text Teks yang diambil dari berkas
 * @returns {Object} Hasil pemrosesan yang berisi daftar user-agent, laman yang boleh dirayapi, laman yang tidak boleh dirayapi, dan sitemap
 */
function parseRobots(text) {
  const lines = text.split(/\r?\n/);
  const result = {
    agents: {},
    Sitemap: [],
  };

  let currentAgent = null;

  for (const rawLine of lines) {
    let line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const firstColonIndex = line.indexOf(":");
    if (firstColonIndex === -1) {
      continue;
    }

    const key = line.substring(0, firstColonIndex).trim().toLowerCase();
    const value = line.substring(firstColonIndex + 1).trim();

    if (key === "user-agent") {
      currentAgent = value.toLowerCase();

      if (!result.agents[currentAgent]) {
        result.agents[currentAgent] = {
          Allow: [],
          Disallow: [],
        };
      }
    } else if (key === "sitemap") {
      result.Sitemap.push(value);
    } else if (currentAgent) {
      if (key === "allow") {
        if (value) {
          result.agents[currentAgent].Allow.push(value);
        }
      } else if (key === "disallow") {
        if (value) {
          result.agents[currentAgent].Disallow.push(value);
        }
      }
    }
  }

  return result;
}

module.exports = parseRobots;
