defmodule CatTest do
  use ExUnit.Case

  import ExUnit.CaptureIO

  doctest Cat

  test "read README file" do
    execute = fn ->
      Cat.run("./README.md")
    end

    assert capture_io(execute) =~ "# Cat"
  end
end
