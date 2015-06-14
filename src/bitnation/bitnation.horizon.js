var Bitnation = require('./bitnation.core.js');
require('./bitnation.http.js');
var jQuery = require('jquery');

(function (Bitnation, $) {

    /**
     * HZ quantities are at 8DP precision
     */
    var _decimals = 8;

    /**
     * Set to true to use testnet rather than mainnet
     */
    var _testnet = true;

    /**
     * The max # of blocks before the tx will not
     * be sent.
     */
    var _deadline = 1440;

    /**
     * The Horizon feature will throw errors in the range
     * -301 through -399.
     */
    var _errorRange = -300;

    /**
     * The ports used by the HZ daemon
     */
    var _ports = {
        MAINNET: {
            API: 7776,
            P2P: 7774
        },
        TESTNET: {
            API: 6976,
            P2P: 6974
        }
    };

    // Sat, 22 Mar 2014 22:22:21 UTC
    var _genesisBlocks = {
        TESTNET: {
            timestamp: 1395526942000
        },
        MAINNET: {
            timestamp: 1395526942000
        }
    };

    var _transactionTypes = {
        messaging: {
            id: 1,
            subTypes: {
                arbitraryMessage: {
                    id: 0,
                    description: 'Arbitrary message'
                }
            }
        }
    };

    /**
     * Mostly from HZ/NXT NRS
     */
    var _PassPhraseGenerator = function () {
        var passphraseGenerator = {};

        // Instance variables
        passphraseGenerator.seeds = 0;
        passphraseGenerator.seedLimit = 512;
        passphraseGenerator.wordCount = 1626;
        passphraseGenerator.words = [
            "like", "just", "love", "know", "never", "want", "time", "out", "there", "make", "look", "eye", "down", "only", "think", "heart", "back", "then", "into", "about", "more", "away", "still", "them", "take", "thing", "even", "through", "long", "always", "world", "too", "friend", "tell", "try", "hand", "thought", "over", "here", "other", "need", "smile", "again", "much", "cry", "been", "night", "ever", "little", "said", "end", "some", "those", "around", "mind", "people", "girl", "leave", "dream", "left", "turn", "myself", "give", "nothing", "really", "off", "before", "something", "find", "walk", "wish", "good", "once", "place", "ask", "stop", "keep", "watch", "seem", "everything", "wait", "got", "yet", "made", "remember", "start", "alone", "run", "hope", "maybe", "believe", "body", "hate", "after", "close", "talk", "stand", "own", "each", "hurt", "help", "home", "god", "soul", "new", "many", "two", "inside", "should", "true", "first", "fear", "mean", "better", "play", "another", "gone", "change", "use", "wonder", "someone", "hair", "cold", "open", "best", "any", "behind", "happen", "water", "dark", "laugh", "stay", "forever", "name", "work", "show", "sky", "break", "came", "deep", "door", "put", "black", "together", "upon", "happy", "such", "great", "white", "matter", "fill", "past", "please", "burn", "cause", "enough", "touch", "moment", "soon", "voice", "scream", "anything", "stare", "sound", "red", "everyone", "hide", "kiss", "truth", "death", "beautiful", "mine", "blood", "broken", "very", "pass", "next", "forget", "tree", "wrong", "air", "mother", "understand", "lip", "hit", "wall", "memory", "sleep", "free", "high", "realize", "school", "might", "skin", "sweet", "perfect", "blue", "kill", "breath", "dance", "against", "fly", "between", "grow", "strong", "under", "listen", "bring", "sometimes", "speak", "pull", "person", "become", "family", "begin", "ground", "real", "small", "father", "sure", "feet", "rest", "young", "finally", "land", "across", "today", "different", "guy", "line", "fire", "reason", "reach", "second", "slowly", "write", "eat", "smell", "mouth", "step", "learn", "three", "floor", "promise", "breathe", "darkness", "push", "earth", "guess", "save", "song", "above", "along", "both", "color", "house", "almost", "sorry", "anymore", "brother", "okay", "dear", "game", "fade", "already", "apart", "warm", "beauty", "heard", "notice", "question", "shine", "began", "piece", "whole", "shadow", "secret", "street", "within", "finger", "point", "morning", "whisper", "child", "moon", "green", "story", "glass", "kid", "silence", "since", "soft", "yourself", "empty", "shall", "angel", "answer", "baby", "bright", "dad", "path", "worry", "hour", "drop", "follow", "power", "war", "half", "flow", "heaven", "act", "chance", "fact", "least", "tired", "children", "near", "quite", "afraid", "rise", "sea", "taste", "window", "cover", "nice", "trust", "lot", "sad", "cool", "force", "peace", "return", "blind", "easy", "ready", "roll", "rose", "drive", "held", "music", "beneath", "hang", "mom", "paint", "emotion", "quiet", "clear", "cloud", "few", "pretty", "bird", "outside", "paper", "picture", "front", "rock", "simple", "anyone", "meant", "reality", "road", "sense", "waste", "bit", "leaf", "thank", "happiness", "meet", "men", "smoke", "truly", "decide", "self", "age", "book", "form", "alive", "carry", "escape", "damn", "instead", "able", "ice", "minute", "throw", "catch", "leg", "ring", "course", "goodbye", "lead", "poem", "sick", "corner", "desire", "known", "problem", "remind", "shoulder", "suppose", "toward", "wave", "drink", "jump", "woman", "pretend", "sister", "week", "human", "joy", "crack", "grey", "pray", "surprise", "dry", "knee", "less", "search", "bleed", "caught", "clean", "embrace", "future", "king", "son", "sorrow", "chest", "hug", "remain", "sat", "worth", "blow", "daddy", "final", "parent", "tight", "also", "create", "lonely", "safe", "cross", "dress", "evil", "silent", "bone", "fate", "perhaps", "anger", "class", "scar", "snow", "tiny", "tonight", "continue", "control", "dog", "edge", "mirror", "month", "suddenly", "comfort", "given", "loud", "quickly", "gaze", "plan", "rush", "stone", "town", "battle", "ignore", "spirit", "stood", "stupid", "yours", "brown", "build", "dust", "hey", "kept", "pay", "phone", "twist", "although", "ball", "beyond", "hidden", "nose", "taken", "fail", "float", "pure", "somehow", "wash", "wrap", "angry", "cheek", "creature", "forgotten", "heat", "rip", "single", "space", "special", "weak", "whatever", "yell", "anyway", "blame", "job", "choose", "country", "curse", "drift", "echo", "figure", "grew", "laughter", "neck", "suffer", "worse", "yeah", "disappear", "foot", "forward", "knife", "mess", "somewhere", "stomach", "storm", "beg", "idea", "lift", "offer", "breeze", "field", "five", "often", "simply", "stuck", "win", "allow", "confuse", "enjoy", "except", "flower", "seek", "strength", "calm", "grin", "gun", "heavy", "hill", "large", "ocean", "shoe", "sigh", "straight", "summer", "tongue", "accept", "crazy", "everyday", "exist", "grass", "mistake", "sent", "shut", "surround", "table", "ache", "brain", "destroy", "heal", "nature", "shout", "sign", "stain", "choice", "doubt", "glance", "glow", "mountain", "queen", "stranger", "throat", "tomorrow", "city", "either", "fish", "flame", "rather", "shape", "spin", "spread", "ash", "distance", "finish", "image", "imagine", "important", "nobody", "shatter", "warmth", "became", "feed", "flesh", "funny", "lust", "shirt", "trouble", "yellow", "attention", "bare", "bite", "money", "protect", "amaze", "appear", "born", "choke", "completely", "daughter", "fresh", "friendship", "gentle", "probably", "six", "deserve", "expect", "grab", "middle", "nightmare", "river", "thousand", "weight", "worst", "wound", "barely", "bottle", "cream", "regret", "relationship", "stick", "test", "crush", "endless", "fault", "itself", "rule", "spill", "art", "circle", "join", "kick", "mask", "master", "passion", "quick", "raise", "smooth", "unless", "wander", "actually", "broke", "chair", "deal", "favorite", "gift", "note", "number", "sweat", "box", "chill", "clothes", "lady", "mark", "park", "poor", "sadness", "tie", "animal", "belong", "brush", "consume", "dawn", "forest", "innocent", "pen", "pride", "stream", "thick", "clay", "complete", "count", "draw", "faith", "press", "silver", "struggle", "surface", "taught", "teach", "wet", "bless", "chase", "climb", "enter", "letter", "melt", "metal", "movie", "stretch", "swing", "vision", "wife", "beside", "crash", "forgot", "guide", "haunt", "joke", "knock", "plant", "pour", "prove", "reveal", "steal", "stuff", "trip", "wood", "wrist", "bother", "bottom", "crawl", "crowd", "fix", "forgive", "frown", "grace", "loose", "lucky", "party", "release", "surely", "survive", "teacher", "gently", "grip", "speed", "suicide", "travel", "treat", "vein", "written", "cage", "chain", "conversation", "date", "enemy", "however", "interest", "million", "page", "pink", "proud", "sway", "themselves", "winter", "church", "cruel", "cup", "demon", "experience", "freedom", "pair", "pop", "purpose", "respect", "shoot", "softly", "state", "strange", "bar", "birth", "curl", "dirt", "excuse", "lord", "lovely", "monster", "order", "pack", "pants", "pool", "scene", "seven", "shame", "slide", "ugly", "among", "blade", "blonde", "closet", "creek", "deny", "drug", "eternity", "gain", "grade", "handle", "key", "linger", "pale", "prepare", "swallow", "swim", "tremble", "wheel", "won", "cast", "cigarette", "claim", "college", "direction", "dirty", "gather", "ghost", "hundred", "loss", "lung", "orange", "present", "swear", "swirl", "twice", "wild", "bitter", "blanket", "doctor", "everywhere", "flash", "grown", "knowledge", "numb", "pressure", "radio", "repeat", "ruin", "spend", "unknown", "buy", "clock", "devil", "early", "false", "fantasy", "pound", "precious", "refuse", "sheet", "teeth", "welcome", "add", "ahead", "block", "bury", "caress", "content", "depth", "despite", "distant", "marry", "purple", "threw", "whenever", "bomb", "dull", "easily", "grasp", "hospital", "innocence", "normal", "receive", "reply", "rhyme", "shade", "someday", "sword", "toe", "visit", "asleep", "bought", "center", "consider", "flat", "hero", "history", "ink", "insane", "muscle", "mystery", "pocket", "reflection", "shove", "silently", "smart", "soldier", "spot", "stress", "train", "type", "view", "whether", "bus", "energy", "explain", "holy", "hunger", "inch", "magic", "mix", "noise", "nowhere", "prayer", "presence", "shock", "snap", "spider", "study", "thunder", "trail", "admit", "agree", "bag", "bang", "bound", "butterfly", "cute", "exactly", "explode", "familiar", "fold", "further", "pierce", "reflect", "scent", "selfish", "sharp", "sink", "spring", "stumble", "universe", "weep", "women", "wonderful", "action", "ancient", "attempt", "avoid", "birthday", "branch", "chocolate", "core", "depress", "drunk", "especially", "focus", "fruit", "honest", "match", "palm", "perfectly", "pillow", "pity", "poison", "roar", "shift", "slightly", "thump", "truck", "tune", "twenty", "unable", "wipe", "wrote", "coat", "constant", "dinner", "drove", "egg", "eternal", "flight", "flood", "frame", "freak", "gasp", "glad", "hollow", "motion", "peer", "plastic", "root", "screen", "season", "sting", "strike", "team", "unlike", "victim", "volume", "warn", "weird", "attack", "await", "awake", "built", "charm", "crave", "despair", "fought", "grant", "grief", "horse", "limit", "message", "ripple", "sanity", "scatter", "serve", "split", "string", "trick", "annoy", "blur", "boat", "brave", "clearly", "cling", "connect", "fist", "forth", "imagination", "iron", "jock", "judge", "lesson", "milk", "misery", "nail", "naked", "ourselves", "poet", "possible", "princess", "sail", "size", "snake", "society", "stroke", "torture", "toss", "trace", "wise", "bloom", "bullet", "cell", "check", "cost", "darling", "during", "footstep", "fragile", "hallway", "hardly", "horizon", "invisible", "journey", "midnight", "mud", "nod", "pause", "relax", "shiver", "sudden", "value", "youth", "abuse", "admire", "blink", "breast", "bruise", "constantly", "couple", "creep", "curve", "difference", "dumb", "emptiness", "gotta", "honor", "plain", "planet", "recall", "rub", "ship", "slam", "soar", "somebody", "tightly", "weather", "adore", "approach", "bond", "bread", "burst", "candle", "coffee", "cousin", "crime", "desert", "flutter", "frozen", "grand", "heel", "hello", "language", "level", "movement", "pleasure", "powerful", "random", "rhythm", "settle", "silly", "slap", "sort", "spoken", "steel", "threaten", "tumble", "upset", "aside", "awkward", "bee", "blank", "board", "button", "card", "carefully", "complain", "crap", "deeply", "discover", "drag", "dread", "effort", "entire", "fairy", "giant", "gotten", "greet", "illusion", "jeans", "leap", "liquid", "march", "mend", "nervous", "nine", "replace", "rope", "spine", "stole", "terror", "accident", "apple", "balance", "boom", "childhood", "collect", "demand", "depression", "eventually", "faint", "glare", "goal", "group", "honey", "kitchen", "laid", "limb", "machine", "mere", "mold", "murder", "nerve", "painful", "poetry", "prince", "rabbit", "shelter", "shore", "shower", "soothe", "stair", "steady", "sunlight", "tangle", "tease", "treasure", "uncle", "begun", "bliss", "canvas", "cheer", "claw", "clutch", "commit", "crimson", "crystal", "delight", "doll", "existence", "express", "fog", "football", "gay", "goose", "guard", "hatred", "illuminate", "mass", "math", "mourn", "rich", "rough", "skip", "stir", "student", "style", "support", "thorn", "tough", "yard", "yearn", "yesterday", "advice", "appreciate", "autumn", "bank", "beam", "bowl", "capture", "carve", "collapse", "confusion", "creation", "dove", "feather", "girlfriend", "glory", "government", "harsh", "hop", "inner", "loser", "moonlight", "neighbor", "neither", "peach", "pig", "praise", "screw", "shield", "shimmer", "sneak", "stab", "subject", "throughout", "thrown", "tower", "twirl", "wow", "army", "arrive", "bathroom", "bump", "cease", "cookie", "couch", "courage", "dim", "guilt", "howl", "hum", "husband", "insult", "led", "lunch", "mock", "mostly", "natural", "nearly", "needle", "nerd", "peaceful", "perfection", "pile", "price", "remove", "roam", "sanctuary", "serious", "shiny", "shook", "sob", "stolen", "tap", "vain", "void", "warrior", "wrinkle", "affection", "apologize", "blossom", "bounce", "bridge", "cheap", "crumble", "decision", "descend", "desperately", "dig", "dot", "flip", "frighten", "heartbeat", "huge", "lazy", "lick", "odd", "opinion", "process", "puzzle", "quietly", "retreat", "score", "sentence", "separate", "situation", "skill", "soak", "square", "stray", "taint", "task", "tide", "underneath", "veil", "whistle", "anywhere", "bedroom", "bid", "bloody", "burden", "careful", "compare", "concern", "curtain", "decay", "defeat", "describe", "double", "dreamer", "driver", "dwell", "evening", "flare", "flicker", "grandma", "guitar", "harm", "horrible", "hungry", "indeed", "lace", "melody", "monkey", "nation", "object", "obviously", "rainbow", "salt", "scratch", "shown", "shy", "stage", "stun", "third", "tickle", "useless", "weakness", "worship", "worthless", "afternoon", "beard", "boyfriend", "bubble", "busy", "certain", "chin", "concrete", "desk", "diamond", "doom", "drawn", "due", "felicity", "freeze", "frost", "garden", "glide", "harmony", "hopefully", "hunt", "jealous", "lightning", "mama", "mercy", "peel", "physical", "position", "pulse", "punch", "quit", "rant", "respond", "salty", "sane", "satisfy", "savior", "sheep", "slept", "social", "sport", "tuck", "utter", "valley", "wolf", "aim", "alas", "alter", "arrow", "awaken", "beaten", "belief", "brand", "ceiling", "cheese", "clue", "confidence", "connection", "daily", "disguise", "eager", "erase", "essence", "everytime", "expression", "fan", "flag", "flirt", "foul", "fur", "giggle", "glorious", "ignorance", "law", "lifeless", "measure", "mighty", "muse", "north", "opposite", "paradise", "patience", "patient", "pencil", "petal", "plate", "ponder", "possibly", "practice", "slice", "spell", "stock", "strife", "strip", "suffocate", "suit", "tender", "tool", "trade", "velvet", "verse", "waist", "witch", "aunt", "bench", "bold", "cap", "certainly", "click", "companion", "creator", "dart", "delicate", "determine", "dish", "dragon", "drama", "drum", "dude", "everybody", "feast", "forehead", "former", "fright", "fully", "gas", "hook", "hurl", "invite", "juice", "manage", "moral", "possess", "raw", "rebel", "royal", "scale", "scary", "several", "slight", "stubborn", "swell", "talent", "tea", "terrible", "thread", "torment", "trickle", "usually", "vast", "violence", "weave", "acid", "agony", "ashamed", "awe", "belly", "blend", "blush", "character", "cheat", "common", "company", "coward", "creak", "danger", "deadly", "defense", "define", "depend", "desperate", "destination", "dew", "duck", "dusty", "embarrass", "engine", "example", "explore", "foe", "freely", "frustrate", "generation", "glove", "guilty", "health", "hurry", "idiot", "impossible", "inhale", "jaw", "kingdom", "mention", "mist", "moan", "mumble", "mutter", "observe", "ode", "pathetic", "pattern", "pie", "prefer", "puff", "rape", "rare", "revenge", "rude", "scrape", "spiral", "squeeze", "strain", "sunset", "suspend", "sympathy", "thigh", "throne", "total", "unseen", "weapon", "weary"
        ];

        // Methods
        passphraseGenerator.push = function(seed) {
            Math.seedrandom(seed, true);
            this.seeds++;
        };

        /**
         * Check if we're finished yet
         */
        passphraseGenerator.isDone = function() {
            return this.seeds == this.seedLimit;
        };

        /**
         * Use this for async progress checks
         */
        passphraseGenerator.percentage = function() {
            return Math.round((this.seeds / this.seedLimit) * 100)
        };

        /**
         * Generate a mnemonic passphrase
         */
        passphraseGenerator.generatePassPhrase = function() {
            var crypto = window.crypto || window.msCrypto;

            var deferred = $.Deferred();

            if (crypto) {
                bits = 128;

                var random = new Uint32Array(bits / 32);

                crypto.getRandomValues(random);

                var i = 0,
                    l = random.length,
                    n = this.wordCount,
                    words = [],
                    x, w1, w2, w3;

                for (; i < l; i++) {
                    x = random[i];
                    w1 = x % n;
                    w2 = (((x / n) >> 0) + w1) % n;
                    w3 = (((((x / n) >> 0) / n) >> 0) + w2) % n;

                    words.push(this.words[w1]);
                    words.push(this.words[w2]);
                    words.push(this.words[w3]);
                }

                crypto.getRandomValues(random);

                deferred.resolve(words.join(" "));

            } else {

                Math.seedrandom();

                $("html").on("mousemove", function(e) {
                    var seed = [e.pageX, e.pageY, +new Date];
                    this.push(seed);

                    if (this.isDone()) {
                        $("html").unbind("mousemove");

                        var words = [];

                        for (var i = 0; i < 12; i++) {
                            var number = Math.floor((Math.random() * this.wordCount) + 1);
                            words.push(this.words[number]);
                        }

                        Math.seedrandom();

                        deferred.resolve(words.join(" "));
                    }
                });
            }

            return deferred.promise();
        };

        /**
         * Reset the generator
         */
        passphraseGenerator.reset = function() {
            this.seeds = 0;
        };

        return passphraseGenerator;
    };

    /**
     * HZ account
     */
    var Account = function (accountAttrs) {
        var hzAccount = {};

        /**
         * Convert a raw value to a human readable quantity of HZ
         */
        var _convertAmountFromRaw = function (rawBalance) {
            return rawBalance / Math.pow(10, _decimals);
        };

        /**
         * Whether the account is brand new or existing
         */
        hzAccount.isNew = (accountAttrs === undefined);

        /**
         * Ensure generator is undefined here
         */
        hzAccount.generator = undefined;

        /**
         * Secret phrase storage for new accounts
         */
        hzAccount.secretPhrase = '';

        /**
         * Initiliase the account if it's an existing one
         */
        hzAccount.attributes = (accountAttrs === undefined) ? {} : accountAttrs;

        /**
         * Create a brand new HZ account
         */
        hzAccount.create = function () {
            var deferred = $.Deferred();

            this.generator = _PassPhraseGenerator();
            this.generator.generatePassPhrase()
            .done(function (result) {
                var account = new Account();
                account.secretPhrase = result;
                deferred.resolve(account);
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Proxy passthrough to the generator's progress report.
         */
        hzAccount.createProgress = function () {
            if (this.generator !== undefined) {
                return this.generator.percentage();
            } else {
                throw 'This account is not in creation.';
            }
        };

        /**
         * Get the account's address
         *
         * Set numeric to return the numeric account ID rather
         * than the RS variant.
         */
        hzAccount.getAddress = function (numeric) {
            if (!this.isNew) {
                return (numeric == undefined) ?
                    this.attributes.accountRS :
                    this.attributes.account;
            } else {
                throw 'This account is brand new.';
            }
        };

        /**
         * Return this account's balance at last update
         */
        hzAccount.getBalance = function () {
            if (!this.isNew) {
                return _convertAmountFromRaw(this.attributes.balanceNQT);
            } else {
                throw 'This account is brand new.';
            }
        };

        return hzAccount;
    }

    /**
     * Representation of a single HZ address
     */
    var Address = function() {
        var address = {};

        var pwg = new PassPhraseGenerator();
        address.secretPhrase = pwg.generatePassPhrase();

        address.getAccountRS = function() {
            //
        };

        address.getAccountId = function() {
            //
        };

        return address;
    };

    /**
     * HZ error definitions
     */
    var errors = {
        messageDecryptionFailure: {
            errorCode: _errorRange - 1,
            errorDescription: 'Unable to decrypt message.'
        },
        passphraseMissingError: {
            errorCode: _errorRange - 2,
            errorDescription: 'You must supply a passphrase'
        }
    };

    /**
     * Horizon Client
     */
    var Client = function () {
        var hzClient = {};

        /**
         * Error constants
         */
        hzClient.ERRORS = {
            UNKNOWN: 5
        };

        /**
         * HZ daemon doesn't respond with HTTP errors for runtime exceptions,
         * so we access this method to parse it.
         */
        var _checkError = function (response) {
            return (response.errorCode !== undefined);
        };

        /**
         * Check if a given IP is on a private range
         *
         * From NRS
         */
        var _isPrivateIP = function(ip) {
            if (!/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
                return false;
            }
            var parts = ip.split('.');
            if (parts[0] === '10' || parts[0] == '127' || (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31)) || (parts[0] === '192' && parts[1] === '168')) {
                return true;
            }
            return false;
        };

        /**
         * Check if we're on a local (assumed safe) IP
         *
         * From NRS
         */
        var _isLocalHost = function () {
            var hostName = window.location.hostname.toLowerCase();
            return hostName == "localhost" || hostName == "127.0.0.1" || _isPrivateIP(hostName);
        };

        /**
         * Converter namespace
         *
         * Various byte / string conversion methods
         *
         * From NRS
         */
        var _converters = function() {
            var charToNibble = {};
            var nibbleToChar = [];
            var i;
            for (i = 0; i <= 9; ++i) {
                var character = i.toString();
                charToNibble[character] = i;
                nibbleToChar.push(character);
            }

            for (i = 10; i <= 15; ++i) {
                var lowerChar = String.fromCharCode('a'.charCodeAt(0) + i - 10);
                var upperChar = String.fromCharCode('A'.charCodeAt(0) + i - 10);

                charToNibble[lowerChar] = i;
                charToNibble[upperChar] = i;
                nibbleToChar.push(lowerChar);
            }

            return {
                byteArrayToHexString: function(bytes) {
                    var str = '';
                    for (var i = 0; i < bytes.length; ++i) {
                        if (bytes[i] < 0) {
                            bytes[i] += 256;
                        }
                        str += nibbleToChar[bytes[i] >> 4] + nibbleToChar[bytes[i] & 0x0F];
                    }

                    return str;
                },
                stringToByteArray: function(str) {
                    str = unescape(encodeURIComponent(str)); //temporary

                    var bytes = new Array(str.length);
                    for (var i = 0; i < str.length; ++i)
                        bytes[i] = str.charCodeAt(i);

                    return bytes;
                },
                hexStringToByteArray: function(str) {
                    var bytes = [];
                    var i = 0;
                    if (0 !== str.length % 2) {
                        bytes.push(charToNibble[str.charAt(0)]);
                        ++i;
                    }

                    for (; i < str.length - 1; i += 2)
                        bytes.push((charToNibble[str.charAt(i)] << 4) + charToNibble[str.charAt(i + 1)]);

                    return bytes;
                },
                stringToHexString: function(str) {
                    return this.byteArrayToHexString(this.stringToByteArray(str));
                },
                hexStringToString: function(hex) {
                    return this.byteArrayToString(this.hexStringToByteArray(hex));
                },
                checkBytesToIntInput: function(bytes, numBytes, opt_startIndex) {
                    var startIndex = opt_startIndex || 0;
                    if (startIndex < 0) {
                        throw new Error('Start index should not be negative');
                    }

                    if (bytes.length < startIndex + numBytes) {
                        throw new Error('Need at least ' + (numBytes) + ' bytes to convert to an integer');
                    }
                    return startIndex;
                },
                byteArrayToSignedShort: function(bytes, opt_startIndex) {
                    var index = this.checkBytesToIntInput(bytes, 2, opt_startIndex);
                    var value = bytes[index];
                    value += bytes[index + 1] << 8;
                    return value;
                },
                byteArrayToSignedInt32: function(bytes, opt_startIndex) {
                    var index = this.checkBytesToIntInput(bytes, 4, opt_startIndex);
                    value = bytes[index];
                    value += bytes[index + 1] << 8;
                    value += bytes[index + 2] << 16;
                    value += bytes[index + 3] << 24;
                    return value;
                },
                byteArrayToBigInteger: function(bytes, opt_startIndex) {
                    var index = this.checkBytesToIntInput(bytes, 8, opt_startIndex);

                    var value = new BigInteger("0", 10);

                    var temp1, temp2;

                    for (var i = 7; i >= 0; i--) {
                        temp1 = value.multiply(new BigInteger("256", 10));
                        temp2 = temp1.add(new BigInteger(bytes[opt_startIndex + i].toString(10), 10));
                        value = temp2;
                    }

                    return value;
                },
                // create a wordArray that is Big-Endian
                byteArrayToWordArray: function(byteArray) {
                    var i = 0,
                        offset = 0,
                        word = 0,
                        len = byteArray.length;
                    var words = new Uint32Array(((len / 4) | 0) + (len % 4 == 0 ? 0 : 1));

                    while (i < (len - (len % 4))) {
                        words[offset++] = (byteArray[i++] << 24) | (byteArray[i++] << 16) | (byteArray[i++] << 8) | (byteArray[i++]);
                    }
                    if (len % 4 != 0) {
                        word = byteArray[i++] << 24;
                        if (len % 4 > 1) {
                            word = word | byteArray[i++] << 16;
                        }
                        if (len % 4 > 2) {
                            word = word | byteArray[i++] << 8;
                        }
                        words[offset] = word;
                    }
                    var wordArray = new Object();
                    wordArray.sigBytes = len;
                    wordArray.words = words;

                    return wordArray;
                },
                // assumes wordArray is Big-Endian
                wordArrayToByteArray: function(wordArray) {
                    var len = wordArray.words.length;
                    if (len == 0) {
                        return new Array(0);
                    }
                    var byteArray = new Array(wordArray.sigBytes);
                    var offset = 0,
                        word, i;
                    for (i = 0; i < len - 1; i++) {
                        word = wordArray.words[i];
                        byteArray[offset++] = word >> 24;
                        byteArray[offset++] = (word >> 16) & 0xff;
                        byteArray[offset++] = (word >> 8) & 0xff;
                        byteArray[offset++] = word & 0xff;
                    }
                    word = wordArray.words[len - 1];
                    byteArray[offset++] = word >> 24;
                    if (wordArray.sigBytes % 4 == 0) {
                        byteArray[offset++] = (word >> 16) & 0xff;
                        byteArray[offset++] = (word >> 8) & 0xff;
                        byteArray[offset++] = word & 0xff;
                    }
                    if (wordArray.sigBytes % 4 > 1) {
                        byteArray[offset++] = (word >> 16) & 0xff;
                    }
                    if (wordArray.sigBytes % 4 > 2) {
                        byteArray[offset++] = (word >> 8) & 0xff;
                    }
                    return byteArray;
                },
                byteArrayToString: function(bytes, opt_startIndex, length) {
                    if (length == 0) {
                        return "";
                    }

                    if (opt_startIndex && length) {
                        var index = this.checkBytesToIntInput(bytes, parseInt(length, 10), parseInt(opt_startIndex, 10));

                        bytes = bytes.slice(opt_startIndex, opt_startIndex + length);
                    }

                    return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
                },
                byteArrayToShortArray: function(byteArray) {
                    var shortArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    var i;
                    for (i = 0; i < 16; i++) {
                        shortArray[i] = byteArray[i * 2] | byteArray[i * 2 + 1] << 8;
                    }
                    return shortArray;
                },
                shortArrayToByteArray: function(shortArray) {
                    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    var i;
                    for (i = 0; i < 16; i++) {
                        byteArray[2 * i] = shortArray[i] & 0xff;
                        byteArray[2 * i + 1] = shortArray[i] >> 8;
                    }

                    return byteArray;
                },
                shortArrayToHexString: function(ary) {
                    var res = "";
                    for (var i = 0; i < ary.length; i++) {
                        res += nibbleToChar[(ary[i] >> 4) & 0x0f] + nibbleToChar[ary[i] & 0x0f] + nibbleToChar[(ary[i] >> 12) & 0x0f] + nibbleToChar[(ary[i] >> 8) & 0x0f];
                    }
                    return res;
                },
                /**
                 * Produces an array of the specified number of bytes to represent the integer
                 * value. Default output encodes ints in little endian format. Handles signed
                 * as well as unsigned integers. Due to limitations in JavaScript's number
                 * format, x cannot be a true 64 bit integer (8 bytes).
                 */
                intToBytes_: function(x, numBytes, unsignedMax, opt_bigEndian) {
                    var signedMax = Math.floor(unsignedMax / 2);
                    var negativeMax = (signedMax + 1) * -1;
                    if (x != Math.floor(x) || x < negativeMax || x > unsignedMax) {
                        throw new Error(
                            x + ' is not a ' + (numBytes * 8) + ' bit integer');
                    }
                    var bytes = [];
                    var current;
                    // Number type 0 is in the positive int range, 1 is larger than signed int,
                    // and 2 is negative int.
                    var numberType = x >= 0 && x <= signedMax ? 0 :
                        x > signedMax && x <= unsignedMax ? 1 : 2;
                    if (numberType == 2) {
                        x = (x * -1) - 1;
                    }
                    for (var i = 0; i < numBytes; i++) {
                        if (numberType == 2) {
                            current = 255 - (x % 256);
                        } else {
                            current = x % 256;
                        }

                        if (opt_bigEndian) {
                            bytes.unshift(current);
                        } else {
                            bytes.push(current);
                        }

                        if (numberType == 1) {
                            x = Math.floor(x / 256);
                        } else {
                            x = x >> 8;
                        }
                    }
                    return bytes;

                },
                int32ToBytes: function(x, opt_bigEndian) {
                    return _converters.intToBytes_(x, 4, 4294967295, opt_bigEndian);
                }
            }
        }();

        /**
         * Generate a public key from a secret phrase string
         */
        var _generatePublicKey = function (secretPhrase) {
            return _getPublicKey(_converters.stringToHexString(secretPhrase));
        };

        /**
         * Get a public key from a hex representation of the secret phrase
         */
        var _getPublicKey = function(secretPhraseHex) {
            var secretPhraseBytes = _converters.hexStringToByteArray(secretPhraseHex);
            var digest = _simpleHash(secretPhraseBytes);
            return _converters.byteArrayToHexString(curve25519.keygen(digest).p);
        };

        /**
         * Verify and sign a transaction
         *
         * From NRS
         */
        var _verifyAndSignTransactionBytes = function(transactionBytes, signature, requestType, data) {
            var transaction = {};
            var byteArray = _converters.hexStringToByteArray(transactionBytes);
            transaction.type = byteArray[0];
            transaction.version = (byteArray[1] & 0xF0) >> 4;
            transaction.subtype = byteArray[1] & 0x0F;
            transaction.timestamp = String(_converters.byteArrayToSignedInt32(byteArray, 2));
            transaction.deadline = String(_converters.byteArrayToSignedShort(byteArray, 6));
            transaction.publicKey = _converters.byteArrayToHexString(byteArray.slice(8, 40));
            transaction.recipient = String(_converters.byteArrayToBigInteger(byteArray, 40));
            transaction.amountNQT = String(_converters.byteArrayToBigInteger(byteArray, 48));
            transaction.feeNQT = String(_converters.byteArrayToBigInteger(byteArray, 56));
            var refHash = byteArray.slice(64, 96);
            transaction.referencedTransactionFullHash = _converters.byteArrayToHexString(refHash);
            if (transaction.referencedTransactionFullHash == "0000000000000000000000000000000000000000000000000000000000000000") {
                transaction.referencedTransactionFullHash = "";
            }
            transaction.flags = 0;
            if (transaction.version > 0) {
                transaction.flags = _converters.byteArrayToSignedInt32(byteArray, 160);
                transaction.ecBlockHeight = String(_converters.byteArrayToSignedInt32(byteArray, 164));
                transaction.ecBlockId = String(_converters.byteArrayToBigInteger(byteArray, 168));
            }
            if (!("amountNQT" in data)) {
                data.amountNQT = "0";
            }
            if (!("recipient" in data)) {
                data.recipient = "13675701959091502344";
                data.recipientRS = "NHZ-8HAA-H88W-UVT5-DUGLV";
            }
            if (transaction.amountNQT != data.amountNQT || transaction.feeNQT != data.feeNQT) {
                return false;
            }
            if ("referencedTransactionFullHash" in data) {
                if (transaction.referencedTransactionFullHash !== data.referencedTransactionFullHash) {
                    return false;
                }
            } else if (transaction.referencedTransactionFullHash !== "") {
                return false;
            }
            if (transaction.version > 0) {
                if (requestType == "sendMoney" || requestType == "sendMessage") {
                    var pos = 176;
                } else {
                    var pos = 177;
                }
            } else {
                var pos = 160;
            }
            switch (requestType) {
                case "sendMoney":
                    if (transaction.type !== 0 || transaction.subtype !== 0) {
                        return false;
                    }
                    break;
                case "sendMessage":
                    if (transaction.type !== 1 || transaction.subtype !== 0) {
                        return false;
                    }
                    break;
                case "setAlias":
                    if (transaction.type !== 1 || transaction.subtype !== 1) {
                        return false;
                    }
                    var aliasLength = parseInt(byteArray[pos], 10);
                    pos++;
                    transaction.aliasName = _converters.byteArrayToString(byteArray, pos, aliasLength);
                    pos += aliasLength;
                    var uriLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.aliasURI = _converters.byteArrayToString(byteArray, pos, uriLength);
                    pos += uriLength;
                    if (transaction.aliasName !== data.aliasName || transaction.aliasURI !== data.aliasURI) {
                        return false;
                    }
                    break;
                case "createPoll":
                    if (transaction.type !== 1 || transaction.subtype !== 2) {
                        return false;
                    }
                    var nameLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.name = _converters.byteArrayToString(byteArray, pos, nameLength);
                    pos += nameLength;
                    var descriptionLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.description = _converters.byteArrayToString(byteArray, pos, descriptionLength);
                    pos += descriptionLength;
                    var nr_options = byteArray[pos];
                    pos++;
                    for (var i = 0; i < nr_options; i++) {
                        var optionLength = _converters.byteArrayToSignedShort(byteArray, pos);
                        pos += 2;
                        transaction["option" + i] = _converters.byteArrayToString(byteArray, pos, optionLength);
                        pos += optionLength;
                    }
                    transaction.minNumberOfOptions = String(byteArray[pos]);
                    pos++;
                    transaction.maxNumberOfOptions = String(byteArray[pos]);
                    pos++;
                    transaction.optionsAreBinary = String(byteArray[pos]);
                    pos++;
                    if (transaction.name !== data.name || transaction.description !== data.description || transaction.minNumberOfOptions !== data.minNumberOfOptions || transaction.maxNumberOfOptions !== data.maxNumberOfOptions || transaction.optionsAreBinary !== data.optionsAreBinary) {
                        return false;
                    }
                    for (var i = 0; i < nr_options; i++) {
                        if (transaction["option" + i] !== data["option" + i]) {
                            return false;
                        }
                    }
                    if (("option" + i) in data) {
                        return false;
                    }
                    break;
                case "castVote":
                    if (transaction.type !== 1 || transaction.subtype !== 3) {
                        return false;
                    }
                    transaction.poll = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    var voteLength = byteArray[pos];
                    pos++;
                    transaction.votes = [];
                    for (var i = 0; i < voteLength; i++) {
                        transaction.votes.push(byteArray[pos]);
                        pos++;
                    }
                    return false;
                    break;
                case "hubAnnouncement":
                    if (transaction.type !== 1 || transaction.subtype != 4) {
                        return false;
                    }
                    var minFeePerByte = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    var numberOfUris = parseInt(byteArray[pos], 10);
                    pos++;
                    var uris = [];
                    for (var i = 0; i < numberOfUris; i++) {
                        var uriLength = parseInt(byteArray[pos], 10);
                        pos++;
                        uris[i] = _converters.byteArrayToString(byteArray, pos, uriLength);
                        pos += uriLength;
                    }
                    return false;
                    break;
                case "setAccountInfo":
                    if (transaction.type !== 1 || transaction.subtype != 5) {
                        return false;
                    }
                    var nameLength = parseInt(byteArray[pos], 10);
                    pos++;
                    transaction.name = _converters.byteArrayToString(byteArray, pos, nameLength);
                    pos += nameLength;
                    var descriptionLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.description = _converters.byteArrayToString(byteArray, pos, descriptionLength);
                    pos += descriptionLength;
                    if (transaction.name !== data.name || transaction.description !== data.description) {
                        return false;
                    }
                    break;
                case "sellAlias":
                    if (transaction.type !== 1 || transaction.subtype !== 6) {
                        return false;
                    }
                    var aliasLength = parseInt(byteArray[pos], 10);
                    pos++;
                    transaction.alias = _converters.byteArrayToString(byteArray, pos, aliasLength);
                    pos += aliasLength;
                    transaction.priceNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.alias !== data.aliasName || transaction.priceNQT !== data.priceNQT) {
                        return false;
                    }
                    break;
                case "buyAlias":
                    if (transaction.type !== 1 && transaction.subtype !== 7) {
                        return false;
                    }
                    var aliasLength = parseInt(byteArray[pos], 10);
                    pos++;
                    transaction.alias = _converters.byteArrayToString(byteArray, pos, aliasLength);
                    pos += aliasLength;
                    if (transaction.alias !== data.aliasName) {
                        return false;
                    }
                    break;
                case "issueAsset":
                    if (transaction.type !== 2 || transaction.subtype !== 0) {
                        return false;
                    }
                    var nameLength = byteArray[pos];
                    pos++;
                    transaction.name = _converters.byteArrayToString(byteArray, pos, nameLength);
                    pos += nameLength;
                    var descriptionLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.description = _converters.byteArrayToString(byteArray, pos, descriptionLength);
                    pos += descriptionLength;
                    transaction.quantityQNT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.decimals = String(byteArray[pos]);
                    pos++;
                    if (transaction.name !== data.name || transaction.description !== data.description || transaction.quantityQNT !== data.quantityQNT || transaction.decimals !== data.decimals) {
                        return false;
                    }
                    break;
                case "transferAsset":
                    if (transaction.type !== 2 || transaction.subtype !== 1) {
                        return false;
                    }
                    transaction.asset = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.quantityQNT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    break;
                case "placeAskOrder":
                case "placeBidOrder":
                    if (transaction.type !== 2) {
                        return false;
                    } else if (requestType == "placeAskOrder" && transaction.subtype !== 2) {
                        return false;
                    } else if (requestType == "placeBidOrder" && transaction.subtype !== 3) {
                        return false;
                    }
                    transaction.asset = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.quantityQNT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.priceNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    break;
                case "cancelAskOrder":
                case "cancelBidOrder":
                    if (transaction.type !== 2) {
                        return false;
                    } else if (requestType == "cancelAskOrder" && transaction.subtype !== 4) {
                        return false;
                    } else if (requestType == "cancelBidOrder" && transaction.subtype !== 5) {
                        return false;
                    }
                    transaction.order = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    break;
                case "dgsListing":
                    if (transaction.type !== 3 && transaction.subtype != 0) {
                        return false;
                    }
                    var nameLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.name = _converters.byteArrayToString(byteArray, pos, nameLength);
                    pos += nameLength;
                    var descriptionLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.description = _converters.byteArrayToString(byteArray, pos, descriptionLength);
                    pos += descriptionLength;
                    var tagsLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    pos += 2;
                    transaction.tags = _converters.byteArrayToString(byteArray, pos, tagsLength);
                    pos += tagsLength;
                    transaction.quantity = String(_converters.byteArrayToSignedInt32(byteArray, pos));
                    pos += 4;
                    transaction.priceNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.name !== data.name || transaction.description !== data.description || transaction.tags !== data.tags || transaction.quantity !== data.quantity || transaction.priceNQT !== data.priceNQT) {
                        return false;
                    }
                    break;
                case "dgsDelisting":
                    if (transaction.type !== 3 && transaction.subtype !== 1) {
                        return false;
                    }
                    transaction.goods = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.goods !== data.goods) {
                        return false;
                    }
                    break;
                case "dgsPriceChange":
                    if (transaction.type !== 3 && transaction.subtype !== 2) {
                        return false;
                    }
                    transaction.goods = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.priceNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.goods !== data.goods || transaction.priceNQT !== data.priceNQT) {
                        return false;
                    }
                    break;
                case "dgsQuantityChange":
                    if (transaction.type !== 3 && transaction.subtype !== 3) {
                        return false;
                    }
                    transaction.goods = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.deltaQuantity = String(_converters.byteArrayToSignedInt32(byteArray, pos));
                    pos += 4;
                    if (transaction.goods !== data.goods || transaction.deltaQuantity !== data.deltaQuantity) {
                        return false;
                    }
                    break;
                case "dgsPurchase":
                    if (transaction.type !== 3 && transaction.subtype !== 4) {
                        return false;
                    }
                    transaction.goods = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.quantity = String(_converters.byteArrayToSignedInt32(byteArray, pos));
                    pos += 4;
                    transaction.priceNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.deliveryDeadlineTimestamp = String(_converters.byteArrayToSignedInt32(byteArray, pos));
                    pos += 4;
                    if (transaction.goods !== data.goods || transaction.quantity !== data.quantity || transaction.priceNQT !== data.priceNQT || transaction.deliveryDeadlineTimestamp !== data.deliveryDeadlineTimestamp) {
                        return false;
                    }
                    break;
                case "dgsDelivery":
                    if (transaction.type !== 3 && transaction.subtype !== 5) {
                        return false;
                    }
                    transaction.purchase = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    var encryptedGoodsLength = _converters.byteArrayToSignedShort(byteArray, pos);
                    var goodsLength = _converters.byteArrayToSignedInt32(byteArray, pos);
                    transaction.goodsIsText = goodsLength < 0;
                    if (goodsLength < 0) {
                        goodsLength &= 2147483647;
                    }
                    pos += 4;
                    transaction.goodsData = _converters.byteArrayToHexString(byteArray.slice(pos, pos + encryptedGoodsLength));
                    pos += encryptedGoodsLength;
                    transaction.goodsNonce = _converters.byteArrayToHexString(byteArray.slice(pos, pos + 32));
                    pos += 32;
                    transaction.discountNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    var goodsIsText = (transaction.goodsIsText ? "true" : "false");
                    if (goodsIsText != data.goodsIsText) {
                        return false;
                    }
                    if (transaction.purchase !== data.purchase || transaction.goodsData !== data.goodsData || transaction.goodsNonce !== data.goodsNonce || transaction.discountNQT !== data.discountNQT) {
                        return false;
                    }
                    break;
                case "dgsFeedback":
                    if (transaction.type !== 3 && transaction.subtype !== 6) {
                        return false;
                    }
                    transaction.purchase = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.purchase !== data.purchase) {
                        return false;
                    }
                    break;
                case "dgsRefund":
                    if (transaction.type !== 3 && transaction.subtype !== 7) {
                        return false;
                    }
                    transaction.purchase = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    transaction.refundNQT = String(_converters.byteArrayToBigInteger(byteArray, pos));
                    pos += 8;
                    if (transaction.purchase !== data.purchase || transaction.refundNQT !== data.refundNQT) {
                        return false;
                    }
                    break;
                case "leaseBalance":
                    if (transaction.type !== 4 && transaction.subtype !== 0) {
                        return false;
                    }
                    transaction.period = String(_converters.byteArrayToSignedShort(byteArray, pos));
                    pos += 2;
                    if (transaction.period !== data.period) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
            if (1) {
                var position = 1;
                position <<= 1;
                if ((transaction.flags & position) != 0) {
                    var attachmentVersion = byteArray[pos];
                    pos++;
                    var encryptedMessageLength = _converters.byteArrayToSignedInt32(byteArray, pos);
                    transaction.messageToEncryptIsText = encryptedMessageLength < 0;
                    if (encryptedMessageLength < 0) {
                        encryptedMessageLength &= 2147483647;
                    }
                    pos += 4;
                    transaction.encryptedMessageData = _converters.byteArrayToHexString(byteArray.slice(pos, pos + encryptedMessageLength));
                    pos += encryptedMessageLength;
                    transaction.encryptedMessageNonce = _converters.byteArrayToHexString(byteArray.slice(pos, pos + 32));
                    pos += 32;
                    var messageToEncryptIsText = (transaction.messageToEncryptIsText ? "true" : "false");
                    if (messageToEncryptIsText != data.messageToEncryptIsText) {
                        return false;
                    }
                    if (transaction.encryptedMessageData !== data.encryptedMessageData || transaction.encryptedMessageNonce !== data.encryptedMessageNonce) {
                        return false;
                    }
                } else if (data.encryptedMessageData) {
                    return false;
                }
                position <<= 1;
                if ((transaction.flags & position) != 0) {
                    var attachmentVersion = byteArray[pos];
                    pos++;
                    var recipientPublicKey = _converters.byteArrayToHexString(byteArray.slice(pos, pos + 32));
                    if (recipientPublicKey != data.recipientPublicKey) {
                        return false;
                    }
                    pos += 32;
                } else if (data.recipientPublicKey) {
                    return false;
                }
                position <<= 1;
                if ((transaction.flags & position) != 0) {
                    var attachmentVersion = byteArray[pos];
                    pos++;
                    var encryptedToSelfMessageLength = _converters.byteArrayToSignedInt32(byteArray, pos);
                    transaction.messageToEncryptToSelfIsText = encryptedToSelfMessageLength < 0;
                    if (encryptedToSelfMessageLength < 0) {
                        encryptedToSelfMessageLength &= 2147483647;
                    }
                    pos += 4;
                    transaction.encryptToSelfMessageData = _converters.byteArrayToHexString(byteArray.slice(pos, pos + encryptedToSelfMessageLength));
                    pos += encryptedToSelfMessageLength;
                    transaction.encryptToSelfMessageNonce = _converters.byteArrayToHexString(byteArray.slice(pos, pos + 32));
                    pos += 32;
                    var messageToEncryptToSelfIsText = (transaction.messageToEncryptToSelfIsText ? "true" : "false");
                    if (messageToEncryptToSelfIsText != data.messageToEncryptToSelfIsText) {
                        return false;
                    }
                    if (transaction.encryptToSelfMessageData !== data.encryptToSelfMessageData || transaction.encryptToSelfMessageNonce !== data.encryptToSelfMessageNonce) {
                        return false;
                    }
                } else if (data.encryptToSelfMessageData) {
                    return false;
                }
            }
            return transactionBytes.substr(0, 192) + signature + transactionBytes.substr(320);
        }

        /**
         * Sign a byte string
         *
         * From NRS
         */
        var _signBytes = function(message, secretPhrase) {
            var messageBytes = _converters.hexStringToByteArray(message);
            var secretPhraseBytes = _converters.hexStringToByteArray(secretPhrase);
            var digest = _simpleHash(secretPhraseBytes);
            var s = curve25519.keygen(digest).s;
            var m = _simpleHash(messageBytes);
            _hash.init();
            _hash.update(m);
            _hash.update(s);
            var x = _hash.getBytes();
            var y = curve25519.keygen(x).p;
            _hash.init();
            _hash.update(m);
            _hash.update(y);
            var h = _hash.getBytes();
            var v = curve25519.sign(h, x, s);
            return _converters.byteArrayToHexString(v.concat(h));
        };

        /**
         * Verify transaction bytes
         *
         * From NRS
         */
        var _verifyBytes = function(signature, message, publicKey) {
            var signatureBytes = _converters.hexStringToByteArray(signature);
            var messageBytes = _converters.hexStringToByteArray(message);
            var publicKeyBytes = _converters.hexStringToByteArray(publicKey);
            var v = signatureBytes.slice(0, 32);
            var h = signatureBytes.slice(32);
            var y = curve25519.verify(v, h, publicKeyBytes);

            var m = _simpleHash(messageBytes);

            _hash.init();
            _hash.update(m);
            _hash.update(y);
            var h2 = _hash.getBytes();

            return _areByteArraysEqual(h, h2);
        };

        /**
         * Check if a pair of byte arrays are equal
         *
         * From NRS
         */
        var _areByteArraysEqual = function (bytes1, bytes2) {
            if (bytes1.length !== bytes2.length)
                return false;

            for (var i = 0; i < bytes1.length; ++i) {
                if (bytes1[i] !== bytes2[i])
                    return false;
            }

            return true;
        };

        /**
         * Core sha256 object
         *
         * From NRS
         */
        var _hash = {
            init: SHA256_init,
            update: SHA256_write,
            getBytes: SHA256_finalize
        };

        /**
         * SHA256 client wrapper
         *
         * From NRS
         */
        var _simpleHash = function(message) {
            _hash.init();
            _hash.update(message);
            return _hash.getBytes();
        };

        /**
         * Send a request to the HZ daemon
         */
        hzClient.sendRequest = function (requestType, params) {
            var deferred = $.Deferred();

            var httpClient = this.getHttpClient();
            params.requestType = requestType;

            // * If it's a broadcastTransaction request, force POST
            var requestMethod = ('secretPhrase' in params || requestType == 'broadcastTransaction') ?
                'POST' : 'GET';

            // Scope issues later if we don't pull checkError here
            var checkError = _checkError;

            // If we're not on localhost, take care not to send the
            // user's secret phrase.
            var _secretPhrase;
            if (!_isLocalHost() && requestMethod == 'POST') {
                if ('secretPhrase' in params) {
                    _secretPhrase = params.secretPhrase;
                    delete params.secretPhrase;
                }

                if (!('publicKey' in params)) {
                    // generate a public key then set it into the data
                    params.publicKey = _generatePublicKey(_secretPhrase);
                }
            }

            var _baseUri = this.getBaseUri();
            httpClient.sendRequest(requestMethod, _baseUri, params)
            .done(function (result) {
                if (checkError(result)) {
                    return deferred.reject(result);
                }

                // If we've stored the secret phrase and the tx requires signing,
                // sign locally and broadcast the transaction.
                if (_secretPhrase && result.unsignedTransactionBytes) {
                    // Sign the tx
                    var publicKey = _generatePublicKey(_secretPhrase);
                    var signature = _signBytes(
                        result.unsignedTransactionBytes,
                        _converters.stringToHexString(_secretPhrase)
                    );

                    if (!_verifyBytes(signature, result.unsignedTransactionBytes, publicKey)) {
                        return deferred.reject('Transaction verification failed');
                    }

                    // Generate the final tx
                    var payload = _verifyAndSignTransactionBytes(
                        result.unsignedTransactionBytes,
                        signature, requestType, params
                    );

                    if (!payload) {
                        return deferred.reject('Transaction signing failed');
                    }

                    // Broadcast the transaction
                    httpClient.sendRequest('POST', _baseUri, {
                        requestType: 'broadcastTransaction',
                        transactionBytes: payload
                    })
                    .done(function (result) {
                        return deferred.resolve(result);
                    })
                    .fail(function (xhr, status, err) {
                        return deferred.reject(err);
                    });
                } else {
                    deferred.resolve(result);
                }

            })
            .fail(function (result) {
                deferred.reject();
            });

            return deferred.promise();
        };

        /**
         * Return the HZ daemon's URI
         */
        hzClient.getBaseUri = function () {
            return 'nhz';
        };

        /**
         * Return the Horizon host
         */
        hzClient.getHzHost = function () {
            var proto = 'http';
            var host = 'localhost';
            var port = (_testnet === true) ?
                _ports.TESTNET.API :
                _ports.MAINNET.API;

            return proto + '://' + host + ':' + port;
        };

        /**
         * Return a new instance of the HTTP client
         */
        hzClient.getHttpClient = function () {
            return Bitnation.http.Client(this.getHzHost());
        };

        /**
         * Get an account ID from a user's secret phrase
         */
        hzClient.getAccountId = function (secretPhrase) {
            var deferred = $.Deferred();

            if (secretPhrase == "") {
                deferred.reject(errors.passphraseMissingError);
            }

            this.sendRequest('getAccountId', {
                secretPhrase: secretPhrase
            })
            .done(function (result) {
                deferred.resolve(result)
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Issue a getBlockchainStatus request
         */
        hzClient.getBlockchainStatus = function () {
            return this.sendRequest('getBlockchainStatus', {});
        };

        /**
         * Return a full Horizon Account by its Reed Solomon format address
         */
        hzClient.getAccount = function (accountRS) {
            var deferred = $.Deferred();

            this.sendRequest('getAccount', {
                account: accountRS
            })
            .done(function (account) {
                deferred.resolve(Account(account));
            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Retrieve a transaction record from the blockchain
         */
        hzClient.getTransaction = function (txId) {
            return this.sendRequest('getTransaction', {
                transaction: txId
            });
        };

        /**
         * Read the message in a transaction
         */
        hzClient.readMessage = function (transactionId, secretPhrase) {
            var deferred = $.Deferred();

            // @todo: Scope issues. Sure there's a better way to do this
            var _client = this;

            this.getTransaction(transactionId)
            .done(function (tx) {

                _client.sendRequest('readMessage', {
                    transaction: transactionId,
                    secretPhrase: secretPhrase
                })
                .done(function (result) {

                    if (Object.getOwnPropertyNames(result).length === 0) {
                        deferred.reject(errors.messageDecryptionFailure);
                    } else {
                        deferred.resolve(result);
                    }

                })
                .fail(function (err) {
                    deferred.reject(err);
                });

            })
            .fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise();
        };

        /**
         * Send a message
         */
        hzClient.sendMessage = function (recipient, content, secretPhrase, encrypt, recipientPubkey) {

            var params = {
                recipient: recipient,
                secretPhrase: secretPhrase,
                deadline: _deadline,
                feeNQT: 1 * Math.pow(10, _decimals)
            };

            if (recipientPubkey !== undefined) {
                params.recipientPublicKey = recipientPubkey;
            }

            if (encrypt === true) {
                params.messageToEncrypt = content;
            } else {
                params.message = content;
            }

            return this.sendRequest('sendMessage', params);

        };

        /**
         * Get transactions for an account
         */
        hzClient.getAccountTransactions = function (accountRS, params) {
            params.account = accountRS;
            return this.sendRequest('getAccountTransactions', params);
        };

        /**
         * List all messages for an account
         */
        hzClient.getMessages = function (accountRS) {
            var deferred = $.Deferred();

            this.getAccountTransactions(accountRS, {
                type: _transactionTypes.messaging.id,
                subtype: _transactionTypes.messaging.subTypes.arbitraryMessage.id
            })
            .done(function (txList) {
                deferred.resolve(txList.transactions);
            })
            .fail(function (err) {
                deferred.resolve(err);
            });

            return deferred.promise();
        };

        /**
         * Convert a HZ timestamp to a Date object
         */
        hzClient.timestampToDate = function (hzTimestamp) {
            var genesisTs = (_testnet === true) ?
                _genesisBlocks.TESTNET.timestamp :
                _genesisBlocks.MAINNET.timestamp;

            return new Date(genesisTs + (hzTimestamp * 1000));
        };

        return hzClient;

    };

    Bitnation.horizon = {
        Account: Account,
        Client: Client,
        errors: errors
    };

})(Bitnation || {}, jQuery);
