defmodule CatTest do
  use ExUnit.Case

  import ExUnit.CaptureIO

  doctest Cat

  defp manualHead, do: "NAME\n    cat"

  describe "meow / When given '-h' or '--help'" do
    test "When gives '-h', Should print manual" do
      assert capture_io(fn -> Cat.main(["-h"]) end) =~ manualHead()
    end

    test "When gives '--help', Should print manual" do
      assert capture_io(fn -> Cat.main(["--help"]) end) =~ manualHead()
    end
  end

  describe "meow / When given '-b' option" do
    setup do
      [
        filepath: ["./README.md"],
        wrongFilepath: ["./README"]
      ]
    end

    test "When file is exists, Should prints with line number", fixture do
      assert capture_io(fn -> Cat.main(["-b", fixture.filepath]) end) =~ "1 # Cat"
    end

    # TODO: 이 테스트를 공통으로 묶어서 한번만 할 수 있어야 합니다.
    test "When file is not exists, Should print error message", fixture do
      assert capture_io(fn -> Cat.main(["-b", fixture.wrongFilepath]) end) ===
               "cat: #{fixture.wrongFilepath}: No such file or directory\n"
    end
  end

  describe "meow / When given path is exists" do
    setup do
      [filepath: ["./README.md"]]
    end

    test "Should print body", fixture do
      assert capture_io(fn -> Cat.main(fixture.filepath) end) =~ "# Cat"
    end
  end

  describe "meow / When given path is not exists" do
    setup do
      [filepath: ["./README"]]
    end

    test "Should print error message", fixture do
      assert capture_io(fn -> Cat.main(fixture.filepath) end) ===
               "cat: #{hd(fixture.filepath)}: No such file or directory\n"
    end
  end
end
