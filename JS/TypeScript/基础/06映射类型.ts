type OptionsFlags<Type> = {
    // Pr
    [Property in keyof Type]:number
    // == [Property in "darkMode"|"newUserProfile"]:number
}

type FeatureFlags = {
    darkMode: () => void,
    newUserProfile: () => void; 
};

type FeatureOptions = OptionsFlags<FeatureFlags>

let a:FeatureFlags