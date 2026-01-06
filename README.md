# `vampire-survivors-explorer`

## How to set up `VampireSurvivorsFiles` and `AssetRipper`

This project uses game assets generated using [`VampireSurvivorsFiles`](https://github.com/Dezzelshipc/VampireSurvivorsFiles) and [`AssetRipper`](https://github.com/AssetRipper/AssetRipper). You'll need to set up and configure both before you can generate json files or images:

1. Clone [`VampireSurvivorsFiles`](https://github.com/Dezzelshipc/VampireSurvivorsFiles)
2. Download and extract [`AssetRipper`](https://github.com/AssetRipper/AssetRipper)
3. Create a shortcut for `AssetRipper.GUI.free.exe` and set a specific port using `--port #`
4. Edit `VampireSurvivorsFiles/Ripper/ripper.py` and set `ripper_port` to the port number you used in step 3
5. Edit `Source/Images/image_gen_new.py` and set `self.lang_data` to `{}` (otherwise image filenames will use language-specific names rather than weapon ids):

   ```diff
   diff --git a/Source/Images/image_gen_new.py b/Source/Images/image_gen_new.py
   index a510834..1ac7778 100644
   --- a/Source/Images/image_gen_new.py
   +++ b/Source/Images/image_gen_new.py
   @@ -220,7 +220,7 @@ class BaseImageGenerator:
           self.data_file: DataFile | None = DataHandler.get_data(dlc_type, data_type)

           lang_data_full = LangHandler.get_lang_file(self.lang_type) or {}
   -        self.lang_data = lang_data_full and lang_data_full.get_lang(Lang.EN) or {}
   +        self.lang_data = {}

           self.requested_gens = requested_gen_types
           self._set_entries()
   ```

6. Run `VampireSurvivorsExplorer/run.bat`
7. Click "Change config"
   1. Set a unique directory for each `*_ASSETS` item (put them all in the same parent directory)
   2. Set `AS_RIPPER` to the extracted `AssetRipper` directory from above
   3. Set `STEAM_APP` to the steam directory for the game (`steamapps/common/Vampire Survivors`)
8. Click "Magic button to rip data automatically" and select all DLCs. This will extract all assets and make them available for use in later steps

## How to import weapon data

1. Set up `VampireSurvivorsFiles` and `AssetRipper`
2. Run the app using `run.bat`
3. Click "Merge dlc data into same files"
4. Click "Open last loaded folder" to get the data output directory
5. Run `bun scripts/import-weapon-json.ts <path to output Weapon.json>`

## How to import images

1. Click "Get unified images (new)"
   1. Click "Compound Data"
   2. Click "Weapon"
   3. Change "Scale Factor" to 2
   4. Check "Generate frame variants"
   5. Click "Start"
2. Click "Open last loaded folder" to get the images output directory
3. Run `bun scripts/import-images.ts <folder from last step> public`
