# Configuration Management

> Everything that controls how your application behaves — without touching a single line of logic code.

---

## The Core Analogy

| | Role |
|---|---|
| 🧠 **Code** | The Brain — logic |
| 🧬 **Config** | The DNA — behavior rules |
| ⚙️ **Result** | Same code + different config = completely different behavior |

If the DNA is messy → even a healthy brain behaves unpredictably.

---

## 01 — What Config Actually Covers

Config is often mistaken for just "secrets." In reality, it controls much more:

### Application Settings
- Port number
- Log level (`debug` / `info` / `error`)
- Connection pool size
- Timeout durations

### Database Config
- Host & port
- Username / password
- Database name
- Connection string

### External Services
- Email API (e.g. SendGrid)
- Payments (e.g. Stripe)
- Authentication (e.g. Clerk)
- Cloud storage

### Feature Flags
- Enable features only for beta users
- A/B testing & gradual rollouts
- Kill switch to instantly disable buggy features

### Business Rules
- Max order limits
- Session expiry time
- Discount thresholds
- Rate limits

### Performance & Logging
- Cache sizes
- Retry limits
- Queue concurrency
- Log verbosity (debug in dev, error in prod)

---

## 02 — Environments & Their Priorities

Same codebase deployed to all three — only config changes.

### Development — Optimise for speed & visibility
- Debug logs ON
- Local DB / sandbox APIs
- Verbose error messages
- Hot-reload enabled

### Staging — Mirror production, cut costs
- Mirrors production settings
- Smaller infrastructure footprint
- Used for QA & integration testing
- Catch issues before go-live

### Production — Reliability & security first
- Error-level logs only
- Live APIs & real data
- Secrets rotated regularly
- Strict access controls

---

## 03 — Configuration Chaos: What Goes Wrong

When there's no structured way to manage config, things break fast.

### ❌ Hardcoded Values
Values scattered across multiple files, easy to miss during updates, no reuse across environments.

```js
// Bad
const dbUrl = "mongodb://localhost";
const apiKey = "abc123";
```

### ❌ Security Leaks
- API keys pushed to GitHub
- `.env` files accidentally committed
- Credentials exposed across the whole team

```bash
git add .env   # ← never do this
```

**Real-world risks:** unauthorized API access, data breaches, financial loss from misused paid services.

### ❌ Inconsistency Across Environments
- "It works on my machine" syndrome
- Different developers using different config values
- Missing or wrong environment variables in production

### ❌ No Startup Validation
- App starts silently with bad or missing config
- Fails unpredictably in production
- Debugging becomes a nightmare with no clear source of truth

---

## 04 — Storage Strategies

### Environment Variables *(standard approach)*
Injected at runtime. Keeps secrets out of source code entirely.
- Tools: `dotenv`, `.env` files

### Config Files *(for structured, documented config)*
YAML or TOML are preferred over JSON — they support comments, which helps with team documentation.
- Examples: `config.yaml`, `settings.toml`

### Cloud-Native Vaults *(for high-scale, secure environments)*
Centralised, auditable, and support secret rotation.
- **AWS Parameter Store**
- **HashiCorp Vault**
- **Azure Key Vault**

---

## 05 — Systematic Approach: Best Practices

### 01 — Centralise Configuration
Use `.env` files or a config module as a single source of truth. No value should live in two places.

```env
DB_URL=mongodb://cluster.example.com
API_KEY=xyz123
LOG_LEVEL=info
```

### 02 — Never Hardcode Secrets

```js
// ❌ Bad
const apiKey = "12345";

// ✅ Good
const apiKey = process.env.API_KEY;
```

### 03 — Validate at Startup — Fail Early
If a required config value is missing, crash loudly at boot. A clear startup error is far better than a mysterious production failure at 2am.

- TypeScript: use **Zod**
- Go: use **Go Validator**

### 04 — Separate Configs Per Environment
Maintain distinct config files for each environment. Never share the same `.env` across dev and production.
.env.development
.env.staging
.env.production
### 05 — Least Privilege & Secret Rotation
Only the people and services that *need* a secret should have access to it. Rotate keys periodically to limit the blast radius of any leak.

### 06 — Version-Control the Structure, Not the Secrets
Commit a `.env.example` with all variable names but blank values. Anyone onboarding knows exactly what to fill in — without exposing real secrets.
.env.example   → commit this  ✓
.env           → gitignore this  ✓
---

## One-Line Takeaway

> Configuration is what controls your app — same code, different config, completely different behaviour. Without discipline, it becomes the #1 source of hidden bugs, security breaches, and deployment failures.