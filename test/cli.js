[
  {
    args: ["run", "test/fixtures/ts-interop/interop.ts"],
    expect: { code: 0 }
  },
  {
    args: ["run", "test/fixtures/interop-test.mjs"],
    expect: { code: 0 }
  },
  {
    args: ["run", "test/integration/test.ts"],
    expect: { code: 0 }
  },
  {
    args: ["build", "test/integration/test.ts", "-o", "tmp"],
    expect (code, stdout, stderr) {
      return stdout.toString().indexOf('tmp/index.js') !== -1;
    }
  },
  {
    args: ["run", "--v8-cache", "test/integration/test.ts"],
    expect: { code: 0 }
  },
  {
    args: ["run", "--v8-cache", "test/integration/stack-trace.js"],
    expect: { code: 0 }
  },
  {
    args: ["run", "test/fixtures/error.js"],
    expect: { code: 1 }
  },
  {
    args: ["run", "test/fixtures/does-not-exist.js"],
    expect: { code: 1 }
  },
  {
    args: ["run", "test/fixtures/error.js", "--no-source-map-register"],
    expect (code, stdout, stderr) {
      return code === 1 && stderr.toString().indexOf('fixtures/error.js') === -1;
    }
  },
  {
    args: ["run", "--watch", "test/integration/test.ts"],
    expect: { code: 2 }
  },
  {
    args: ["build", "-o", "tmp", "--watch", "test/fixtures/no-dep.js"],
    timeout: 500,
    expect: { timeout: true }
  },
  {
    args: ["run", "test/fixtures/ts-error1/fail.ts"],
    expect (code, stdout, stderr) {
      return code === 1 && stderr.toString().indexOf('fail.ts:2:1') !== -1;
    }
  },
  {
    args: ["run", "test/fixtures/ts-error2/ts-error.ts"],
    expect (code, stdout, stderr) {
      return code === 1 && stderr.toString().indexOf('ts-error.ts(3,16)') !== -1 && stderr.toString().split('\n').length < 11;
    }
  },
  {
    args: ["run", "-t", "test/fixtures/with-type-errors/ts-error.ts"],
    expect: { code: 0 }
  },
  {
    args: ["build", "-o", "tmp", "test/fixtures/test.cjs"],
    expect (code, stdout, stderr) {
      return stdout.toString().indexOf('tmp/index.cjs') !== -1;
    }
  },
  {
    args: ["build", "-o", "tmp", "test/fixtures/test.mjs"],
    expect (code, stdout, stderr) {
      return stdout.toString().indexOf('tmp/index.js') !== -1;
    }
  },
  {
    args: ["build", "-o", "tmp", "test/fixtures/test.mjs", "--stats-out", "tmp/stats.json"],
    expect (code, stdout, stderr) {
      const fs = require('fs');
      try {
        JSON.parse(fs.readFileSync('tmp/stats.json', 'utf8'));
      } catch {
        return false;
      }
      return true;
    }
  },
  {
    args: ["build", "--quiet", "test/integration/test.ts"],
    expect (code, stdout) {
      stdout = stdout.toString().replace(/[\r\n\s]/g, '').trim();
      return stdout.length === 0;
    }
  },
  {
    args: ["build", "test/integration/test.ts"],
    env: {
      TYPESCRIPT_LOOKUP_PATH: '/tmp/nowhere'
    },
    expect (code, stdout) { 
      return code === 0 && stdout.indexOf('ncc built-in') !== -1;
    },
  }
]
