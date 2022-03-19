defmodule CatTest do
  use ExUnit.Case

  import ExUnit.CaptureIO

  doctest Cat

  describe "run / When given path is exists" do
    setup do
      [filepath: "./README.md"]
    end

    test "Should print body", fixture do
      assert capture_io(fn -> Cat.run(fixture.filepath) end) =~ "# Cat"
    end
  end

  describe "run / When given path is not exists" do
    setup do
      [filepath: "./README"]
    end

    test "Should print error message", fixture do
      assert capture_io(fn -> Cat.run(fixture.filepath) end) === "cat: #{fixture.filepath}: No such file or directory\n"
    end
  end
end
