const configurations = [
    {
        "dn": "ou=utdanning_ot,ou=components,o=fint",
        "name": "utdanning-ot",
        "displayName": "Utdanning OT",
        "path": "/utdanning/ot",
        "assetPath": "/api/components/assets/utdanning_ot",
        "classes": [],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=utdanning_larling,ou=components,o=fint",
        "name": "utdanning-larling",
        "displayName": "Utdanning Lærling",
        "path": "/utdanning/larling",
        "assetPath": "/api/components/assets/utdanning_larling",
        "classes": [],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=okonomi_regnskap,ou=components,o=fint",
        "name": "okonomi-regnskap",
        "displayName": "Økonomi Regnskap",
        "path": "/okonomi/regnskap",
        "assetPath": "/api/components/assets/okonomi_regnskap",
        "classes": [],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=okonomi_faktura,ou=components,o=fint",
        "name": "okonomi-faktura",
        "displayName": "Økonomi Faktura",
        "path": "/okonomi/faktura",
        "assetPath": "/api/components/assets/okonomi_faktura",
        "classes": [
            {
                "name": "faktura",
                "path": "/okonomi/faktura/faktura"
            },
            {
                "name": "fakturagrunnlag",
                "path": "/okonomi/faktura/fakturagrunnlag"
            },
            {
                "name": "fakturautsteder",
                "path": "/okonomi/faktura/fakturautsteder"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=okonomi_kodeverk,ou=components,o=fint",
        "name": "okonomi-kodeverk",
        "displayName": "Økonomi Kodeverk",
        "path": "/okonomi/kodeverk",
        "assetPath": "/api/components/assets/okonomi_kodeverk",
        "classes": [
            {
                "name": "merverdiavgift",
                "path": "/okonomi/kodeverk/merverdiavgift"
            },
            {
                "name": "vare",
                "path": "/okonomi/kodeverk/vare"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=arkiv_samferdsel,ou=components,o=fint",
        "name": "arkiv-samferdsel",
        "displayName": "Arkiv Samferdsel",
        "path": "/arkiv/samferdsel",
        "assetPath": "/api/components/assets/arkiv_samferdsel",
        "classes": [
            {
                "name": "soknaddrosjeloyve",
                "path": "/arkiv/samferdsel/soknaddrosjeloyve"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=arkiv_kulturminnevern,ou=components,o=fint",
        "name": "arkiv-kulturminnevern",
        "displayName": "Arkiv Kulturminnevern",
        "path": "/arkiv/kulturminnevern",
        "assetPath": "/api/components/assets/arkiv_kulturminnevern",
        "classes": [
            {
                "name": "dispensasjonautomatiskfredakulturminne",
                "path": "/arkiv/kulturminnevern/dispensasjonautomatiskfredakulturminne"
            },
            {
                "name": "tilskuddfartoy",
                "path": "/arkiv/kulturminnevern/tilskuddfartoy"
            },
            {
                "name": "tilskuddfredabygningprivateie",
                "path": "/arkiv/kulturminnevern/tilskuddfredabygningprivateie"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=arkiv_kodeverk,ou=components,o=fint",
        "name": "arkiv-kodeverk",
        "displayName": "Arkiv Kodeverk",
        "path": "/arkiv/kodeverk",
        "assetPath": "/api/components/assets/arkiv_kodeverk",
        "classes": [
            {
                "name": "dokumentstatus",
                "path": "/arkiv/kodeverk/dokumentstatus"
            },
            {
                "name": "dokumenttype",
                "path": "/arkiv/kodeverk/dokumenttype"
            },
            {
                "name": "format",
                "path": "/arkiv/kodeverk/format"
            },
            {
                "name": "journalposttype",
                "path": "/arkiv/kodeverk/journalposttype"
            },
            {
                "name": "journalstatus",
                "path": "/arkiv/kodeverk/journalstatus"
            },
            {
                "name": "klassifikasjonstype",
                "path": "/arkiv/kodeverk/klassifikasjonstype"
            },
            {
                "name": "korrespondanseparttype",
                "path": "/arkiv/kodeverk/korrespondanseparttype"
            },
            {
                "name": "merknadstype",
                "path": "/arkiv/kodeverk/merknadstype"
            },
            {
                "name": "partrolle",
                "path": "/arkiv/kodeverk/partrolle"
            },
            {
                "name": "rolle",
                "path": "/arkiv/kodeverk/rolle"
            },
            {
                "name": "saksmappetype",
                "path": "/arkiv/kodeverk/saksmappetype"
            },
            {
                "name": "saksstatus",
                "path": "/arkiv/kodeverk/saksstatus"
            },
            {
                "name": "skjermingshjemmel",
                "path": "/arkiv/kodeverk/skjermingshjemmel"
            },
            {
                "name": "tilgangsrestriksjon",
                "path": "/arkiv/kodeverk/tilgangsrestriksjon"
            },
            {
                "name": "tilknyttetregistreringsom",
                "path": "/arkiv/kodeverk/tilknyttetregistreringsom"
            },
            {
                "name": "variantformat",
                "path": "/arkiv/kodeverk/variantformat"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=arkiv_noark,ou=components,o=fint",
        "name": "arkiv-noark",
        "displayName": "Arkiv Noark",
        "path": "/arkiv/noark",
        "assetPath": "/api/components/assets/arkiv_noark",
        "classes": [
            {
                "name": "administrativenhet",
                "path": "/arkiv/noark/administrativenhet"
            },
            {
                "name": "arkivdel",
                "path": "/arkiv/noark/arkivdel"
            },
            {
                "name": "arkivressurs",
                "path": "/arkiv/noark/arkivressurs"
            },
            {
                "name": "autorisasjon",
                "path": "/arkiv/noark/autorisasjon"
            },
            {
                "name": "dokumentfil",
                "path": "/arkiv/noark/dokumentfil"
            },
            {
                "name": "klassifikasjonssystem",
                "path": "/arkiv/noark/klassifikasjonssystem"
            },
            {
                "name": "sak",
                "path": "/arkiv/noark/sak"
            },
            {
                "name": "tilgang",
                "path": "/arkiv/noark/tilgang"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=personvern_samtykke,ou=components,o=fint",
        "name": "personvern-samtykke",
        "displayName": "Personvern Samtykke",
        "path": "/personvern/samtykke",
        "assetPath": "/api/components/assets/personvern_samtykke",
        "classes": [],
        "core": true,
        "inBeta": true,
        "inProduction": false,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=administrasjon_okonomi,ou=components,o=fint",
        "name": "administrasjon-okonomi",
        "displayName": "Administrasjon Økonomi",
        "path": "/administrasjon/okonomi",
        "assetPath": "/api/components/assets/administrasjon_okonomi",
        "classes": [],
        "core": true,
        "inBeta": false,
        "inProduction": false,
        "inPlayWithFint": false
    },
    {
        "dn": "ou=utdanning_utdanningsprogram,ou=components,o=fint",
        "name": "utdanning-utdanningsprogram",
        "displayName": "Utdanning Utdanningsprogram",
        "path": "/utdanning/utdanningsprogram",
        "assetPath": "/api/components/assets/utdanning_utdanningsprogram",
        "classes": [
            {
                "name": "arstrinn",
                "path": "/utdanning/utdanningsprogram/arstrinn"
            },
            {
                "name": "programomrade",
                "path": "/utdanning/utdanningsprogram/programomrade"
            },
            {
                "name": "programomrademedlemskap",
                "path": "/utdanning/utdanningsprogram/programomrademedlemskap"
            },
            {
                "name": "skole",
                "path": "/utdanning/utdanningsprogram/skole"
            },
            {
                "name": "utdanningsprogram",
                "path": "/utdanning/utdanningsprogram/utdanningsprogram"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=utdanning_vurdering,ou=components,o=fint",
        "name": "utdanning-vurdering",
        "displayName": "Utdanning Vurdering",
        "path": "/utdanning/vurdering",
        "assetPath": "/api/components/assets/utdanning_vurdering",
        "classes": [
            {
                "name": "anmerkninger",
                "path": "/utdanning/vurdering/anmerkninger"
            },
            {
                "name": "eksamensgruppe",
                "path": "/utdanning/vurdering/eksamensgruppe"
            },
            {
                "name": "eksamensgruppemedlemskap",
                "path": "/utdanning/vurdering/eksamensgruppemedlemskap"
            },
            {
                "name": "elevfravar",
                "path": "/utdanning/vurdering/elevfravar"
            },
            {
                "name": "fravar",
                "path": "/utdanning/vurdering/fravar"
            },
            {
                "name": "fravarsoversikt",
                "path": "/utdanning/vurdering/fravarsoversikt"
            },
            {
                "name": "halvarsfagvurdering",
                "path": "/utdanning/vurdering/halvarsfagvurdering"
            },
            {
                "name": "halvarsordensvurdering",
                "path": "/utdanning/vurdering/halvarsordensvurdering"
            },
            {
                "name": "karakterhistorie",
                "path": "/utdanning/vurdering/karakterhistorie"
            },
            {
                "name": "karakterverdi",
                "path": "/utdanning/vurdering/karakterverdi"
            },
            {
                "name": "sensor",
                "path": "/utdanning/vurdering/sensor"
            },
            {
                "name": "sluttfagvurdering",
                "path": "/utdanning/vurdering/sluttfagvurdering"
            },
            {
                "name": "sluttordensvurdering",
                "path": "/utdanning/vurdering/sluttordensvurdering"
            },
            {
                "name": "underveisfagvurdering",
                "path": "/utdanning/vurdering/underveisfagvurdering"
            },
            {
                "name": "underveisordensvurdering",
                "path": "/utdanning/vurdering/underveisordensvurdering"
            },
            {
                "name": "vurdering",
                "path": "/utdanning/vurdering/vurdering"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=utdanning_kodeverk,ou=components,o=fint",
        "name": "utdanning-kodeverk",
        "displayName": "Utdanning Kodeverk",
        "path": "/utdanning/kodeverk",
        "assetPath": "/api/components/assets/utdanning_kodeverk",
        "classes": [
            {
                "name": "avbruddsarsak",
                "path": "/utdanning/kodeverk/avbruddsarsak"
            },
            {
                "name": "eksamensform",
                "path": "/utdanning/kodeverk/eksamensform"
            },
            {
                "name": "elevkategori",
                "path": "/utdanning/kodeverk/elevkategori"
            },
            {
                "name": "fagmerknad",
                "path": "/utdanning/kodeverk/fagmerknad"
            },
            {
                "name": "fravarstype",
                "path": "/utdanning/kodeverk/fravarstype"
            },
            {
                "name": "karakterskala",
                "path": "/utdanning/kodeverk/karakterskala"
            },
            {
                "name": "karakterstatus",
                "path": "/utdanning/kodeverk/karakterstatus"
            },
            {
                "name": "otenhet",
                "path": "/utdanning/kodeverk/otenhet"
            },
            {
                "name": "otstatus",
                "path": "/utdanning/kodeverk/otstatus"
            },
            {
                "name": "skolear",
                "path": "/utdanning/kodeverk/skolear"
            },
            {
                "name": "skoleeiertype",
                "path": "/utdanning/kodeverk/skoleeiertype"
            },
            {
                "name": "termin",
                "path": "/utdanning/kodeverk/termin"
            },
            {
                "name": "tilrettelegging",
                "path": "/utdanning/kodeverk/tilrettelegging"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=administrasjon_fullmakt,ou=components,o=fint",
        "name": "administrasjon-fullmakt",
        "displayName": "Administrasjon Fullmakt",
        "path": "/administrasjon/fullmakt",
        "assetPath": "/api/components/assets/administrasjon_fullmakt",
        "classes": [
            {
                "name": "fullmakt",
                "path": "/administrasjon/fullmakt/fullmakt"
            },
            {
                "name": "rolle",
                "path": "/administrasjon/fullmakt/rolle"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=utdanning_timeplan,ou=components,o=fint",
        "name": "utdanning-timeplan",
        "displayName": "Utdanning Timeplan",
        "path": "/utdanning/timeplan",
        "assetPath": "/api/components/assets/utdanning_timeplan",
        "classes": [
            {
                "name": "fag",
                "path": "/utdanning/timeplan/fag"
            },
            {
                "name": "faggruppe",
                "path": "/utdanning/timeplan/faggruppe"
            },
            {
                "name": "faggruppemedlemskap",
                "path": "/utdanning/timeplan/faggruppemedlemskap"
            },
            {
                "name": "rom",
                "path": "/utdanning/timeplan/rom"
            },
            {
                "name": "time",
                "path": "/utdanning/timeplan/time"
            },
            {
                "name": "undervisningsgruppe",
                "path": "/utdanning/timeplan/undervisningsgruppe"
            },
            {
                "name": "undervisningsgruppemedlemskap",
                "path": "/utdanning/timeplan/undervisningsgruppemedlemskap"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=utdanning_elev,ou=components,o=fint",
        "name": "utdanning-elev",
        "displayName": "Utdanning Elev",
        "path": "/utdanning/elev",
        "assetPath": "/api/components/assets/utdanning_elev",
        "classes": [
            {
                "name": "basisgruppe",
                "path": "/utdanning/elev/basisgruppe"
            },
            {
                "name": "basisgruppemedlemskap",
                "path": "/utdanning/elev/basisgruppemedlemskap"
            },
            {
                "name": "elev",
                "path": "/utdanning/elev/elev"
            },
            {
                "name": "elevforhold",
                "path": "/utdanning/elev/elevforhold"
            },
            {
                "name": "elevtilrettelegging",
                "path": "/utdanning/elev/elevtilrettelegging"
            },
            {
                "name": "kontaktlarergruppe",
                "path": "/utdanning/elev/kontaktlarergruppe"
            },
            {
                "name": "kontaktlarergruppemedlemskap",
                "path": "/utdanning/elev/kontaktlarergruppemedlemskap"
            },
            {
                "name": "kontaktperson",
                "path": "/utdanning/elev/kontaktperson"
            },
            {
                "name": "medlemskap",
                "path": "/utdanning/elev/medlemskap"
            },
            {
                "name": "person",
                "path": "/utdanning/elev/person"
            },
            {
                "name": "persongruppe",
                "path": "/utdanning/elev/persongruppe"
            },
            {
                "name": "persongruppemedlemskap",
                "path": "/utdanning/elev/persongruppemedlemskap"
            },
            {
                "name": "skoleressurs",
                "path": "/utdanning/elev/skoleressurs"
            },
            {
                "name": "undervisningsforhold",
                "path": "/utdanning/elev/undervisningsforhold"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=administrasjon_kodeverk,ou=components,o=fint",
        "name": "administrasjon-kodeverk",
        "displayName": "Administrasjon Kodeverk",
        "path": "/administrasjon/kodeverk",
        "assetPath": "/api/components/assets/administrasjon_kodeverk",
        "classes": [
            {
                "name": "aktivitet",
                "path": "/administrasjon/kodeverk/aktivitet"
            },
            {
                "name": "anlegg",
                "path": "/administrasjon/kodeverk/anlegg"
            },
            {
                "name": "ansvar",
                "path": "/administrasjon/kodeverk/ansvar"
            },
            {
                "name": "arbeidsforholdstype",
                "path": "/administrasjon/kodeverk/arbeidsforholdstype"
            },
            {
                "name": "art",
                "path": "/administrasjon/kodeverk/art"
            },
            {
                "name": "diverse",
                "path": "/administrasjon/kodeverk/diverse"
            },
            {
                "name": "formal",
                "path": "/administrasjon/kodeverk/formal"
            },
            {
                "name": "fravarsgrunn",
                "path": "/administrasjon/kodeverk/fravarsgrunn"
            },
            {
                "name": "fravarstype",
                "path": "/administrasjon/kodeverk/fravarstype"
            },
            {
                "name": "funksjon",
                "path": "/administrasjon/kodeverk/funksjon"
            },
            {
                "name": "kontrakt",
                "path": "/administrasjon/kodeverk/kontrakt"
            },
            {
                "name": "lonnsart",
                "path": "/administrasjon/kodeverk/lonnsart"
            },
            {
                "name": "lopenummer",
                "path": "/administrasjon/kodeverk/lopenummer"
            },
            {
                "name": "objekt",
                "path": "/administrasjon/kodeverk/objekt"
            },
            {
                "name": "personalressurskategori",
                "path": "/administrasjon/kodeverk/personalressurskategori"
            },
            {
                "name": "prosjekt",
                "path": "/administrasjon/kodeverk/prosjekt"
            },
            {
                "name": "prosjektart",
                "path": "/administrasjon/kodeverk/prosjektart"
            },
            {
                "name": "ramme",
                "path": "/administrasjon/kodeverk/ramme"
            },
            {
                "name": "stillingskode",
                "path": "/administrasjon/kodeverk/stillingskode"
            },
            {
                "name": "uketimetall",
                "path": "/administrasjon/kodeverk/uketimetall"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=administrasjon_organisasjon,ou=components,o=fint",
        "name": "administrasjon-organisasjon",
        "displayName": "Administrasjon Organisasjon",
        "path": "/administrasjon/organisasjon",
        "assetPath": "/api/components/assets/administrasjon_organisasjon",
        "classes": [
            {
                "name": "arbeidslokasjon",
                "path": "/administrasjon/organisasjon/arbeidslokasjon"
            },
            {
                "name": "organisasjonselement",
                "path": "/administrasjon/organisasjon/organisasjonselement"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    },
    {
        "dn": "ou=administrasjon_personal,ou=components,o=fint",
        "name": "administrasjon-personal",
        "displayName": "Administrasjon Personal",
        "path": "/administrasjon/personal",
        "assetPath": "/api/components/assets/administrasjon_personal",
        "classes": [
            {
                "name": "arbeidsforhold",
                "path": "/administrasjon/personal/arbeidsforhold"
            },
            {
                "name": "fastlonn",
                "path": "/administrasjon/personal/fastlonn"
            },
            {
                "name": "fasttillegg",
                "path": "/administrasjon/personal/fasttillegg"
            },
            {
                "name": "fravar",
                "path": "/administrasjon/personal/fravar"
            },
            {
                "name": "kontaktperson",
                "path": "/administrasjon/personal/kontaktperson"
            },
            {
                "name": "person",
                "path": "/administrasjon/personal/person"
            },
            {
                "name": "personalressurs",
                "path": "/administrasjon/personal/personalressurs"
            },
            {
                "name": "variabellonn",
                "path": "/administrasjon/personal/variabellonn"
            }
        ],
        "core": true,
        "inBeta": true,
        "inProduction": true,
        "inPlayWithFint": true
    }
];
export default configurations;