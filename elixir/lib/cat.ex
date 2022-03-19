defmodule Cat do
  @moduledoc """
  Documentation for Cat.
  """

  @doc """
  Cat.

  ## Examples
      iex> Cat.run("./README.md")
      # Cat...
      :ok
  """
  def run(filepath) do
    IO.puts """
    #{filepath}
    # Cat
    """
  end
end
