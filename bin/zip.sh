declare DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
mkdir -p "$DIR/build"

if [[ "$1" =~ ^-?a$ ]]; then
  # for uploading to AnkiWeb
  declare addon_id=''
else
  # for installing myself
  declare addon_id='ze_frozen_fields'
fi

cd "$DIR"

zip -r "$DIR/build/$addon_id.ankiaddon" \
  "config."{json,md} \
  "manifest.json" \
  "user_files/README.md" \
  "__init__.py" \
  "src/"*".py" \
  "src/lib/"*".py" \
  "src/gui/"*".py" \
